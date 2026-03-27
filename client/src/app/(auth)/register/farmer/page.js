"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input, inputClasses } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { PhoneInput } from "../../../../components/auth/PhoneInput";
import { PasswordInput } from "../../../../components/auth/PasswordInput";
import { PasswordStrength } from "../../../../components/auth/PasswordStrength";
import { RoleSwitcher } from "../../../../components/auth/RoleSwitcher";
import { StepIndicator } from "../../../../components/auth/StepIndicator";
import { mockAuthRequest } from "../../../../lib/axios";
import { registerFarmerSchemas } from "../../../../lib/validators";
import { regions } from "../../../../constants/regions";

const steps = ["Personal", "Farm Details", "Payout Setup"];

export default function RegisterFarmerPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState({ error: "", success: "" });
  const resolver = useMemo(() => zodResolver(registerFarmerSchemas[currentStep]), [currentStep]);
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
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      region: "",
      city: "",
      acceptedTerms: false,
      primaryCrop: "Cocoa Beans",
      harvestVolume: "",
      cooperative: "",
      exportReady: true,
      inspectionPreference: "AgriculNet coordinated",
      payoutMethod: "MTN MoMo",
      accountName: "",
      payoutPhone: "",
      notificationOptIn: true,
    },
  });

  const password = watch("password");

  const submitStep = async (values) => {
    setSubmitState({ error: "", success: "" });

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    try {
      await mockAuthRequest(values, { delay: 1100 });
      setSubmitState({ success: "Farmer registration mocked successfully. Connect the backend later.", error: "" });
    } catch (error) {
      setSubmitState({ success: "", error: error.message });
    }
  };

  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Farmer Registration</p>
          <h1 className="mt-2 font-display text-[22px] leading-[1.15] text-[#111827]">Create your farmer account</h1>
        </div>
        <p className="text-[13px] text-[#374151]">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-[#1A6B3C] hover:text-[#2E8B57]">Sign In</Link>
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <RoleSwitcher
          value="farmer"
          onChange={(nextValue) => {
            if (nextValue === "buyer") {
              router.push("/register/buyer");
            }
          }}
          options={[{ label: "Farmer", value: "farmer" }, { label: "Buyer", value: "buyer" }]}
        />
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(submitStep)}>
        {currentStep === 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>First Name *</Label>
                <Input placeholder="e.g. Jean" {...register("firstName")} />
                {errors.firstName ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.firstName.message}</p> : null}
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input placeholder="e.g. Ngum" {...register("lastName")} />
                {errors.lastName ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.lastName.message}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PhoneInput
                label="Phone Number *"
                value={watch("phone")}
                onChange={(nextPhone) => setValue("phone", nextPhone.replace(/\s/g, ""), { shouldValidate: true })}
                helper="Used for trade alerts and payout setup"
                error={errors.phone?.message}
              />
              <div>
                <Label>Email Address</Label>
                <Input placeholder="name@example.com" {...register("email")} />
                <p className="mt-2 text-[12px] text-[#6B7280]">Optional for trade notifications</p>
                {errors.email ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.email.message}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordInput label="Password *" placeholder="Minimum 8 characters" error={errors.password?.message} {...register("password")} />
              <PasswordInput label="Confirm Password *" placeholder="Repeat password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
            </div>

            <PasswordStrength password={password || ""} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Region *</Label>
                <select className={inputClasses} {...register("region")}>
                  <option value="">Select a region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.region.message}</p> : null}
              </div>
              <div>
                <Label>City / Town *</Label>
                <Input placeholder="e.g. Kumba" {...register("city")} />
                {errors.city ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.city.message}</p> : null}
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#374151]">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#D1D5DB]" {...register("acceptedTerms")} />
              <span>I agree to AgriculNet&apos;s Terms of Use and Privacy Policy.</span>
            </label>
            {errors.acceptedTerms ? <p className="-mt-3 text-[12px] text-[#922B21]">{errors.acceptedTerms.message}</p> : null}
          </>
        ) : null}

        {currentStep === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Primary Crop *</Label>
              <Input placeholder="Cocoa Beans" {...register("primaryCrop")} />
              {errors.primaryCrop ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.primaryCrop.message}</p> : null}
            </div>
            <div>
              <Label>Estimated Harvest Volume *</Label>
              <Input placeholder="e.g. 2,000 kg" {...register("harvestVolume")} />
              {errors.harvestVolume ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.harvestVolume.message}</p> : null}
            </div>
            <div>
              <Label>Farm or Cooperative Name *</Label>
              <Input placeholder="e.g. Kumba Growers Union" {...register("cooperative")} />
              {errors.cooperative ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.cooperative.message}</p> : null}
            </div>
            <div>
              <Label>Inspection Preference *</Label>
              <Input placeholder="AgriculNet coordinated" {...register("inspectionPreference")} />
              {errors.inspectionPreference ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.inspectionPreference.message}</p> : null}
            </div>
            <label className="sm:col-span-2 flex items-start gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#374151]">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#D1D5DB]" {...register("exportReady")} />
              <span>My produce is prepared for export checks and buyer documentation.</span>
            </label>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Payout Method *</Label>
              <Input placeholder="MTN MoMo" {...register("payoutMethod")} />
              {errors.payoutMethod ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.payoutMethod.message}</p> : null}
            </div>
            <div>
              <Label>Account Name *</Label>
              <Input placeholder="Jean Ngum" {...register("accountName")} />
              {errors.accountName ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.accountName.message}</p> : null}
            </div>
            <PhoneInput
              label="Payout Phone *"
              value={watch("payoutPhone")}
              onChange={(nextPhone) => setValue("payoutPhone", nextPhone.replace(/\s/g, ""), { shouldValidate: true })}
              error={errors.payoutPhone?.message}
            />
            <label className="flex items-start gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#374151]">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#D1D5DB]" {...register("notificationOptIn")} />
              <span>Send SMS and email updates when buyers request a quote or place an order.</span>
            </label>
          </div>
        ) : null}

        {submitState.error ? <p className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[12px] text-[#922B21]">{submitState.error}</p> : null}
        {submitState.success ? <p className="rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">{submitState.success}</p> : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3 text-[13px]">
            {currentStep > 0 ? (
              <Button type="button" variant="outline" onClick={() => setCurrentStep((step) => step - 1)}>
                Back
              </Button>
            ) : null}
            <button type="button" className="font-medium text-[#6B7280] hover:text-[#1A6B3C]">Continue with Google</button>
          </div>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Processing..." : currentStep === steps.length - 1 ? "Create Farmer Account" : "Continue"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
