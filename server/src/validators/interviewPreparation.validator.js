import { z } from "zod";

export const interviewPreparationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .max(150, "Company name is too long")
    .optional(),
  targetRole: z.string().trim().max(150, "Target role is too long").optional(),
  jobDescription: z
    .string()
    .trim()
    .max(50000, "Job description is too long")
    .optional(),
  preparationType: z.enum(["oa", "technical", "hr"], {
    error: "Preparation type must be oa, technical, or hr",
  }),
});
