"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { OtpInput } from "../../../components/auth/OtpInput";
import { mockAuthRequest } from "../../../lib/axios";
import { verifyPhoneSchema } from "../../../lib/validators";
import { StatusBadge } from "../../../components/common/StatusBadge";

export default function VerifyPhonePage() {
  const [feedback, setFeedback] = useState({ error: "", success: "" });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(verifyPhoneSchema),
    mode: "onChange",
    defaultValues: { code: "" },
  });

  const onSubmit = async (values) => {
    setFeedback({ error: "", success: "" });
    try {
      await mockAuthRequest(values, { delay: 700 });
      setFeedback({ success: "Phone verification mocked successfully.", error: "" });
    } catch (error) {
      setFeedback({ success: "", error: error.message });
    }
  };

  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <StatusBadge status="pending" label="Phone verification" />
      <h1 className="mt-4 font-display text-[22px] leading-[1.15] text-[#111827]">Enter verification code</h1>
      <p className="mt-3 text-[14px] leading-6 text-[#374151]">Enter the 6-digit code sent to your phone number to unlock payouts and real-time trade alerts.</p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <OtpInput value={watch("code")} onChange={(nextCode) => setValue("code", nextCode, { shouldValidate: true })} error={errors.code?.message} />

        {feedback.error ? <p className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[12px] text-[#922B21]">{feedback.error}</p> : null}
        {feedback.success ? <p className="rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">{feedback.success}</p> : null}

        <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#6B7280]">
          <span>Didn&apos;t get the code?</span>
          <button type="button" className="font-semibold text-[#1A6B3C] hover:text-[#2E8B57]">
            Resend in 0:32
          </button>
        </div>
      </form>
    </Card>
  );
}
