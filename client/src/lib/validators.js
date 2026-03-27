import { z } from "zod";

const cameroonPhone = /^6\d{8}$/;

export const signInSchema = z.object({
  mode: z.enum(["phone", "email"]),
  phone: z.string().optional(),
  email: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters."),
}).superRefine((value, ctx) => {
  if (value.mode === "phone" && !cameroonPhone.test((value.phone || "").replace(/\s+/g, ""))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Enter a valid Cameroon phone number.",
    });
  }

  if (value.mode === "email" && !value.email) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["email"],
      message: "Enter your email address.",
    });
  }

  if (value.mode === "email" && value.email && !z.string().email().safeParse(value.email).success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["email"],
      message: "Enter a valid email address.",
    });
  }
});

export const forgotPasswordSchema = z.object({
  mode: z.enum(["phone", "email"]),
  phone: z.string().optional(),
  email: z.string().optional(),
}).superRefine((value, ctx) => {
  if (value.mode === "phone" && !cameroonPhone.test((value.phone || "").replace(/\s+/g, ""))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Enter a valid Cameroon phone number.",
    });
  }

  if (value.mode === "email" && (!value.email || !z.string().email().safeParse(value.email).success)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["email"],
      message: "Enter a valid email address.",
    });
  }
});

export const resetPasswordSchema = z.object({
  code: z.string().min(6, "Enter the reset code."),
  password: z.string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "One uppercase letter")
    .regex(/\d/, "One number"),
  confirmPassword: z.string(),
}).refine((value) => value.password === value.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export const verifyPhoneSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code."),
});

export const registerFarmerSchemas = [
  z.object({
    firstName: z.string().min(2, "First name is required."),
    lastName: z.string().min(2, "Last name is required."),
    phone: z.string().regex(cameroonPhone, "Enter a valid Cameroon phone number."),
    email: z.string().email("Enter a valid email address.").or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
    region: z.string().min(2, "Select your region."),
    city: z.string().min(2, "Enter your city or town."),
    acceptedTerms: z.boolean().refine(Boolean, "You must accept the terms."),
  }).refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  }),
  z.object({
    primaryCrop: z.string().min(2, "Choose a primary crop."),
    harvestVolume: z.string().min(2, "Enter your estimated harvest volume."),
    cooperative: z.string().min(2, "Enter your farm or cooperative name."),
    exportReady: z.boolean(),
    inspectionPreference: z.string().min(2, "Select an inspection preference."),
  }),
  z.object({
    payoutMethod: z.string().min(2, "Choose a payout method."),
    accountName: z.string().min(2, "Enter your account name."),
    payoutPhone: z.string().regex(cameroonPhone, "Enter a valid payout phone number."),
    notificationOptIn: z.boolean(),
  }),
];

export const registerBuyerSchemas = [
  z.object({
    buyerType: z.enum(["local", "international"]),
    companyName: z.string().min(2, "Enter your company or buyer name."),
    contactName: z.string().min(2, "Enter a contact name."),
    phone: z.string().regex(cameroonPhone, "Enter a valid Cameroon phone number."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  }).refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  }),
  z.object({
    buyingFocus: z.string().min(2, "Tell us what you source most often."),
    monthlyVolume: z.string().min(2, "Enter your target order volume."),
    destination: z.string().min(2, "Enter your destination market."),
    agreedToPolicy: z.boolean().refine(Boolean, "You must accept the buyer terms."),
  }),
];