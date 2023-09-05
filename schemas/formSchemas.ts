import { z } from "zod";

export const formSchema = z.object({
  // selectedPreset: z
  //   .object({
  //     name: z.string(),
  //     prompt: z.string(),
  //   })
  //   .optional(),
  prompt: z.string().min(1, {
    message: "Prompt is empty.",
  }),
  url: z.string().min(1, {
    message: "Website URL is empty.",
  }),
  // Inputs for nateraw/qrcode-sd
  negativePrompt: z.string().optional(),
  inferenceStep: z.number().optional(),
  guidance: z.number().optional(),
  strength: z.number().optional(),
  controlNetConditioning: z.number().optional(),
  seed: z.number().optional(),
});
