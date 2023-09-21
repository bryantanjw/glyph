export const types = ["ControlNet"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
}

export const models: Model<ModelType>[] = [
  {
    id: "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    name: "SD1.5",
    description: "Fast and capable model across all themes",
  },
  {
    id: "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    name: "SDXL",
    description: "Slow but generally capable model across themes",
  },
  // {
  //   id: "c8fd040b-41c3-42d7-84a8-69ea8b7e724b",
  //   name: "sdxl-ControlNet",
  //   description: "Capable of straightforward tasks, very fast, and lower cost.",
  //   strengths: "Moderate classification, semantic search",
  // },
];
