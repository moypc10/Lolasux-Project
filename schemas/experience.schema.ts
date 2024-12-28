import { z } from "zod";

export const ExperienceSchema = z.object({
    currentRole: z.string().max(50).min(10, { message: "Current Role is required" }),
    yearsOfExperience: z.number().int().min(1), 
    skills: z.array(z.string()).min(1 , { message: "At least one skill must be provided" }),
    company: z.string().min(1, { message: "Company is required" }),
  });

export type Experience = z.infer<typeof ExperienceSchema>;
