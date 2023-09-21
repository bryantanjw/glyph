import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { playgroundFormSchema } from "@/schemas/formSchemas";

export function usePlaygroundForm() {
  const form = useForm<z.infer<typeof playgroundFormSchema>>({
    resolver: zodResolver(playgroundFormSchema),
    defaultValues: {
      modelVersion:
        "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
      prompt: "",
      url: "https://glyph.so",
      image:
        "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Glyph_QR-4SnbMgp1uJIaw8nPw9m9KNNkDGkSgY.png",
      negativePrompt: "ugly, disfigured, low quality, blurry, nsfw",
      inferenceStep: 30,
      guidance: 9.5,
      strength: 0.85,
      controlNetConditioning: 1.8,
      seed: -1,
    },
  });

  return form;
}
