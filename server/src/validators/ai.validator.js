import { z } from "zod";

export const generateNotesSchema = z.object({
  prompt: z.string().optional(),
  userPrompt: z.string().optional(),
  extractedText: z.string().optional(),
  outputType: z.enum(["brief", "deep"], {
    error: "Output type must be either brief or deep",
  }),
});
