import { z } from "zod";

export const PersonalInfoSchema = z.object({
  fullName: z.string().max(100).min(1, { message: "Full Name is required" }),
  email: z.string().email().max(100),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,15}$/)
    .min(12, { message: "Phone number must be at least 12 digits long" })
    .max(16,{message: "Phone number must be maximun 16 digits long"})
    .refine((val) => val.startsWith('+'),{
      message: "Phone number must start with '+'",}),
  location: z.string().min(1, { message: "Location is required" }),
  portfolioUrl: z.string().url().optional().or(z.string().max(0))
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;