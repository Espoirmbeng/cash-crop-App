"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { PhoneInput } from "../../../../components/auth/PhoneInput";
import { PasswordInput } from "../../../../components/auth/PasswordInput";
import { RoleSwitcher } from "../../../../components/auth/RoleSwitcher";
import { StepIndicator } from "../../../../components/auth/StepIndicator";
import { mockAuthRequest } from "../../../../lib/axios";
import { registerBuyerSchemas } from "../../../../lib/validators";

const steps = ["Buyer Profile", "Sourcing Preferences"];

export default function RegisterBuyerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState({ error: "", success: "" });
  const resolver = useMemo(() => zodResolver(registerBuyerSchemas[currentStep]), [currentStep]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver,
    mode: "onChange",
    defaultValues: {
      buyerType: "local",
      companyName: "",
      contactName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      buyingFocus: "",
      monthlyVolume: "",
      destination: "",
      agreedToPolicy: false,
    },
  });

  const submitStep = async (values) => {
    setSubmitState({ error: "", success: "" });
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    try {
      await mockAuthRequest(values, { delay: 1000 });
      setSubmitState({ success: "Buyer registration mocked successfully. Hook up the API when ready.", error: "" });
    } catch (error) {
      setSubmitState({ success: "", error: error.message });
    }
  };

  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <div className="space-y-2">
        <p className="section-eyebrow">Buyer Registration</p>
        <h1 className="font-display text-[22px] leading-[1.15] text-[#111827]">Create your buyer account</h1>
        <p className="text-[14px] leading-6 text-[#374151]">Set up a local or international sourcing profile with the same protected onboarding flow.</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <RoleSwitcher
          className="w-full justify-start sm:w-auto"
          value={watch("buyerType")}
          onChange={(nextValue) => setValue("buyerType", nextValue, { shouldValidate: true })}
          options={[
            { label: "Local Buyer", value: "local" },
            { label: "International Buyer", value: "international" },
          ]}
        />
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(submitStep)}>
        {currentStep === 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Company or Buyer Name *</Label>
                <Input placeholder="Agri Export Ltd." {...register("companyName")} />
                {errors.companyName ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.companyName.message}</p> : null}
              </div>
              <div>
                <Label>Contact Name *</Label>
                <Input placeholder="Amina Kofi" {...register("contactName")} />
                {errors.contactName ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.contactName.message}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PhoneInput
                label="Phone Number *"
                value={watch("phone")}
                onChange={(nextPhone) => setValue("phone", nextPhone.replace(/\s/g, ""), { shouldValidate: true })}
                error={errors.phone?.message}
              />
              <div>
                <Label>Email Address *</Label>
                <Input placeholder="buyer@example.com" {...register("email")} />
                {errors.email ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.email.message}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordInput label="Password *" placeholder="Minimum 8 characters" error={errors.password?.message} {...register("password")} />
              <PasswordInput label="Confirm Password *" placeholder="Repeat password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
            </div>
          </>
        ) : null}

        {currentStep === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Buying Focus *</Label>
              <Input placeholder="Cocoa, coffee, maize" {...register("buyingFocus")} />
              {errors.buyingFocus ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.buyingFocus.message}</p> : null}
            </div>
            <div>
              <Label>Monthly Volume *</Label>
              <Input placeholder="e.g. 12 tonnes" {...register("monthlyVolume")} />
              {errors.monthlyVolume ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.monthlyVolume.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Label>Destination Market *</Label>
              <Input placeholder="Douala, Lagos, Rotterdam" {...register("destination")} />
              {errors.destination ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.destination.message}</p> : null}
            </div>
            <label className="sm:col-span-2 flex items-start gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#374151]">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#D1D5DB]" {...register("agreedToPolicy")} />
              <span>I agree to AgriculNet buyer terms, sourcing policies, and protected payment conditions.</span>
            </label>
            {errors.agreedToPolicy ? <p className="-mt-3 sm:col-span-2 text-[12px] text-[#922B21]">{errors.agreedToPolicy.message}</p> : null}
          </div>
        ) : null}

        {submitState.error ? <p className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[12px] text-[#922B21]">{submitState.error}</p> : null}
        {submitState.success ? <p className="rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">{submitState.success}</p> : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          {currentStep > 0 ? (
            <Button type="button" variant="outline" onClick={() => setCurrentStep((step) => step - 1)}>
              Back
            </Button>
          ) : <span />}
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Processing..." : currentStep === steps.length - 1 ? "Create Buyer Account" : "Continue"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
