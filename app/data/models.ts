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
    id: "79878d00000d92d6f8923ffe8d25605463c928eaf322b022a29e0b6328a6cfd0",
    name: "Realistic Vision",
    description: "Fast and capable model for realistic themes",
    // strengths: "Moderate classification, semantic search",
  },
  {
    id: "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    name: "General Purpose",
    description: "Slow but generally capable model across themes",
    // strengths:
    //   "Parsing text, simple classification, address correction, keywords",
  },
  // {
  //   id: "c8fd040b-41c3-42d7-84a8-69ea8b7e724b",
  //   name: "sdxl-ControlNet",
  //   description: "Capable of straightforward tasks, very fast, and lower cost.",
  //   strengths: "Moderate classification, semantic search",
  // },
];
