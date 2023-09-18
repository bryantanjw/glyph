import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/formSchemas";

export function usePlaygroundForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // selectedPreset: presets.find((preset) => preset.name === "Futuristic"),
      modelVersion:
        "79878d00000d92d6f8923ffe8d25605463c928eaf322b022a29e0b6328a6cfd0",
      prompt: "",
      url: "",
      negativePrompt: "ugly, disfigured, low quality, blurry, nsfw",
      inferenceStep: 80,
      guidance: 12,
      strength: 0.85,
      controlNetConditioning: 1.2,
      seed: -1,
    },
  });

  return form;
}
