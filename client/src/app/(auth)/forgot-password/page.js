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
import { RoleSwitcher } from "../../../components/auth/RoleSwitcher";
import { mockAuthRequest } from "../../../lib/axios";
import { forgotPasswordSchema } from "../../../lib/validators";

export default function ForgotPasswordPage() {
  const [mode, setMode] = useState("phone");
  const [feedback, setFeedback] = useState({ error: "", success: "" });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { mode: "phone", phone: "", email: "" },
  });

  const onSubmit = async (values) => {
    setFeedback({ error: "", success: "" });
    try {
      await mockAuthRequest(values, { delay: 850 });
      setFeedback({ success: "Reset code sent. Connect the delivery service when backend APIs are ready.", error: "" });
    } catch (error) {
      setFeedback({ success: "", error: error.message });
    }
  };

  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <p className="section-eyebrow">Recovery</p>
      <h1 className="mt-2 font-display text-[22px] leading-[1.15] text-[#111827]">Forgot your password?</h1>
      <p className="mt-3 text-[14px] leading-6 text-[#374151]">Choose your preferred recovery channel and we will send a secure reset code.</p>

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

        {feedback.error ? <p className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[12px] text-[#922B21]">{feedback.error}</p> : null}
        {feedback.success ? <p className="rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">{feedback.success}</p> : null}

        <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </Button>

        <Link href="/sign-in" className="inline-flex text-[13px] font-semibold text-[#1A6B3C] hover:text-[#2E8B57]">
          Back to Sign In
        </Link>
      </form>
    </Card>
  );
}
