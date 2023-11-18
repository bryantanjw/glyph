import { z } from "zod";

export const playgroundFormSchema = z.object({
  modelVersion: z.string().min(1, {
    message: "Model version is empty.",
  }),
  prompt: z.string().min(1, {
    message: "Prompt is empty.",
  }),
  url: z.string().min(1, {
    message: "Website URL is empty.",
  }),
  image: z.string().nonempty({
    message: "Image is required",
  }),
  negativePrompt: z.string().optional(),
  inferenceStep: z.number().optional(),
  guidance: z.number().optional(),
  strength: z.number().optional(),
  controlnetConditioning: z.number().optional(),
  seed: z.number().optional(),
});

export const signInFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});
