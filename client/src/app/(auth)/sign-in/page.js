"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { PhoneInput } from "../../../components/auth/PhoneInput";
import { PasswordInput } from "../../../components/auth/PasswordInput";
import { RoleSwitcher } from "../../../components/auth/RoleSwitcher";
import { mockAuthRequest } from "../../../lib/axios";
import { signInSchema } from "../../../lib/validators";

export default function SignInPage() {
  const [mode, setMode] = useState("phone");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      mode: "phone",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setSubmitError("");
    setSubmitSuccess("");

    try {
      await mockAuthRequest(values);
      setSubmitSuccess("Mock sign-in complete. Backend wiring can be attached later.");
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">Welcome Back</p>
          <h1 className="mt-2 font-display text-[22px] leading-[1.15] text-[#111827]">Sign in to AgriculNet</h1>
          <p className="mt-3 text-[14px] leading-6 text-[#374151]">Use phone or email to continue trading, sourcing, and tracking orders.</p>
        </div>
        <p className="text-[13px] text-[#374151]">
          New here?{" "}
          <Link href="/register" className="font-semibold text-[#1A6B3C] hover:text-[#2E8B57]">
            Register
          </Link>
        </p>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <RoleSwitcher
          value={mode}
          onChange={(nextMode) => {
            setMode(nextMode);
            setValue("mode", nextMode, { shouldValidate: true });
          }}
          options={[
            { label: "Phone Number", value: "phone" },
            { label: "Email Address", value: "email" },
          ]}
        />

        {mode === "phone" ? (
          <PhoneInput
            label="Phone Number"
            value={watch("phone")}
            onChange={(nextPhone) => setValue("phone", nextPhone.replace(/\s/g, ""), { shouldValidate: true })}
            error={errors.phone?.message}
          />
        ) : (
          <div>
            <Label>Email Address</Label>
            <Input placeholder="name@example.com" {...register("email")} />
            {errors.email ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.email.message}</p> : null}
          </div>
        )}

        <PasswordInput label="Password" placeholder="Enter your password" error={errors.password?.message} {...register("password")} />

        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
          <Link href="/forgot-password" className="font-semibold text-[#1A6B3C] hover:text-[#2E8B57]">
            Forgot your password?
          </Link>
          <button type="button" className="font-medium text-[#6B7280] hover:text-[#1A6B3C]">
            Sign in with OTP
          </button>
        </div>

        {submitError ? <p className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[12px] text-[#922B21]">{submitError}</p> : null}
        {submitSuccess ? <p className="rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">{submitSuccess}</p> : null}

        <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Card>
  );
}
