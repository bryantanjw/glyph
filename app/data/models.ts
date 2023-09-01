export const types = ["ControlNet"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "qrcode-sd",
    description:
      "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
    type: "ControlNet",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
  },
  {
    id: "c8fd040b-41c3-42d7-84a8-69ea8b7e724b",
    name: "sdxl-ControlNet",
    description: "Capable of straightforward tasks, very fast, and lower cost.",
    type: "ControlNet",
    strengths: "Moderate classification, semantic search",
  },
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "qart",
    description:
      "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
    type: "ControlNet",
    strengths:
      "Complex intent, cause and effect, creative generation, search, summarization for audience",
  },
];
