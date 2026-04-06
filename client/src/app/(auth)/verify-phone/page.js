"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { OtpInput } from "../../../components/auth/OtpInput";
import { verifyPhoneSchema } from "../../../lib/validators";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { DevHintsPanel } from "../../../components/auth/DevHintsPanel";
import useAuthStore from "../../../store/authStore";

const getNextRoute = (nextStep, user) => {
  if (nextStep === "verify_email") return "/verify-email";
  if (nextStep === "pending_review") return "/pending";
  if (nextStep === "dashboard") {
    if (user?.role === "farmer") return "/farmer/dashboard";
    if (["local_buyer", "international_buyer"].includes(user?.role)) return "/buyer/dashboard";
  }
  return "/sign-in";
};

export default function VerifyPhonePage() {
  const router = useRouter();
  const {
    onboarding,
    syncOnboarding,
    verifyPhone,
    resendVerification,
  } = useAuthStore();
  const [feedback, setFeedback] = useState({ error: "", success: "" });
  const [resending, setResending] = useState(false);
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

  useEffect(() => {
    syncOnboarding();
  }, [syncOnboarding]);

  const onSubmit = async (values) => {
    if (!onboarding?.userId) {
      setFeedback({ error: "No phone verification session is available. Start from registration or sign-in.", success: "" });
      return;
    }

    setFeedback({ error: "", success: "" });
    const result = await verifyPhone(onboarding.userId, values.code);

    if (!result.success) {
      setFeedback({ success: "", error: result.error });
      return;
    }

    setFeedback({ success: result.data.message, error: "" });
    router.push(getNextRoute(result.data.nextStep, result.data.user));
  };

  const handleResend = async () => {
    setResending(true);
    setFeedback({ error: "", success: "" });
    const result = await resendVerification("phone");
    setResending(false);

    if (!result.success) {
      setFeedback({ success: "", error: result.error });
      return;
    }

    setFeedback({ success: `A new code was sent to ${result.data.target || onboarding?.phone || "your phone"}.`, error: "" });
  };

  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <StatusBadge status="pending" label="Phone verification" />
      <h1 className="mt-4 font-display text-[22px] leading-[1.15] text-[#111827]">Enter verification code</h1>
      <p className="mt-3 text-[14px] leading-6 text-[#374151]">
        Enter the 6-digit code sent to {onboarding?.phone || "your phone number"} to unlock payouts and trade alerts.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <OtpInput value={watch("code")} onChange={(nextCode) => setValue("code", nextCode, { shouldValidate: true })} error={errors.code?.message} />

        {feedback.error ? <p className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[12px] text-[#922B21]">{feedback.error}</p> : null}
        {feedback.success ? <p className="rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">{feedback.success}</p> : null}

        <DevHintsPanel hints={onboarding?.devHints} />

        <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#6B7280]">
          <span>Didn&apos;t get the code?</span>
          <button type="button" onClick={handleResend} disabled={resending} className="font-semibold text-[#1A6B3C] hover:text-[#2E8B57] disabled:opacity-50">
            {resending ? "Resending..." : "Send a new code"}
          </button>
        </div>
      </form>
    </Card>
  );
}
