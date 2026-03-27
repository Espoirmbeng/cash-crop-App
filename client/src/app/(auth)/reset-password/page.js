"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { PasswordInput } from "../../../components/auth/PasswordInput";
import { PasswordStrength } from "../../../components/auth/PasswordStrength";
import { mockAuthRequest } from "../../../lib/axios";
import { resetPasswordSchema } from "../../../lib/validators";

export default function ResetPasswordPage() {
  const [feedback, setFeedback] = useState({ error: "", success: "" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: { code: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values) => {
    setFeedback({ error: "", success: "" });
    try {
      await mockAuthRequest(values, { delay: 900 });
      setFeedback({ success: "Password reset mocked successfully.", error: "" });
    } catch (error) {
      setFeedback({ success: "", error: error.message });
    }
  };

  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <p className="section-eyebrow">Password Reset</p>
      <h1 className="mt-2 font-display text-[22px] leading-[1.15] text-[#111827]">Create a new password</h1>
      <p className="mt-3 text-[14px] leading-6 text-[#374151]">Use the reset code we sent you and choose a stronger password before your next trade.</p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Reset Code</Label>
          <Input placeholder="Enter 6-digit code" {...register("code")} />
          {errors.code ? <p className="mt-2 text-[12px] text-[#922B21]">{errors.code.message}</p> : null}
        </div>

        <PasswordInput label="New Password" placeholder="At least 8 characters" error={errors.password?.message} {...register("password")} />
        <PasswordInput label="Confirm Password" placeholder="Repeat password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
        <PasswordStrength password={watch("password") || ""} />

        {feedback.error ? <p className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[12px] text-[#922B21]">{feedback.error}</p> : null}
        {feedback.success ? <p className="rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">{feedback.success}</p> : null}

        <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Saving..." : "Set New Password"}
        </Button>
      </form>
    </Card>
  );
}
