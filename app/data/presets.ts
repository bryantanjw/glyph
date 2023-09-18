export interface Preset {
  modelVersion: string;
  negativePrompt?: string;
  id: string;
  name: string;
  prompt: string;
  inferenceStep: number;
  guidance?: number;
  strength?: number;
  controlNetConditioning?: number;
  seed?: number;
}

const negativePrompt = "ugly, disfigured, low quality, blurry, nsfw";
const seed = -1;

export const presets: Preset[] = [
  {
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Anime",
    negativePrompt,
    prompt: "test",
    inferenceStep: 30,
    seed,
  },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    modelVersion:
      "79878d00000d92d6f8923ffe8d25605463c928eaf322b022a29e0b6328a6cfd0",
    name: "Cyberpunk",
    prompt:
      "1mechanical girl,ultra realistic details, portrait, global illumination, shadows, octane render, 8k, ultra sharp,intricate, ornaments detailed, cold colors, metal, egypician detail, highly intricate details, realistic light, trending on cgsociety, glowing eyes, facing camera, neon details, machanical limbs,blood vessels connected to tubes,mechanical vertebra attaching to back,mechanical cervial attaching to neck,sitting,wires and cables connecting to head",
    negativePrompt,
    inferenceStep: 30,
    guidance: 12,
    controlNetConditioning: 2.0,
    seed,
  },
  {
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
    name: "Vintage",
    prompt: "",
    negativePrompt,
    inferenceStep: 30,
    seed,
  },
  {
    modelVersion:
      "79878d00000d92d6f8923ffe8d25605463c928eaf322b022a29e0b6328a6cfd0",
    id: "cc198b13-4933-43aa-977e-dcd95fa30770",
    name: "Abstract art",
    prompt:
      "abstract art, non-representative, non-figurative, abstract expressionism, cubist, modern art, geometric, minimalism, surreal, avant-garde ",
    negativePrompt,
    inferenceStep: 40,
    seed,
    guidance: 12,
    controlNetConditioning: 2.2,
  },
  {
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    id: "adfa95be-a575-45fd-a9ef-ea45386c64de",
    name: "Cinematic",
    prompt: "",
    negativePrompt,
    inferenceStep: 30,
    seed,
  },
  {
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
    name: "Neo Aztec",
    prompt: "",
    negativePrompt,
    inferenceStep: 30,
    seed,
  },
  {
    id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc",
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    name: "Forestpunk",
    prompt:
      "forestpunk, green pastures, lush environment, vivid colors, animation by studio ghibli",
    negativePrompt,
    inferenceStep: 30,
    seed,
  },
  {
    id: "4641ef41-1c0f-421d-b4b2-70fe431081f3",
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    name: "Futuristic",
    prompt:
      "aerial view, a futuristic research complex in a bright foggy jungle, hard lighting",
    negativePrompt,
    inferenceStep: 80,
    guidance: 12,
    strength: 0.85,
    controlNetConditioning: 1.2,
    seed,
  },
  {
    id: "1234abcd-5678-efgh-9012-ijkl34567890",
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    name: "Minimalist",
    prompt:
      "interior of luxury condominium with minimalist furniture and lush house plants and abstract wall paintings | modern architecture by makoto shinkai, ilya kuvshinov, lois van baarle, rossdraws and frank lloyd wright",
    negativePrompt,
    inferenceStep: 30,
    seed,
  },
  {
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    id: "48d34082-72f3-4a1b-a14d-f15aca4f57a0",
    name: "Japanese fusion",
    prompt: "Japanese painting, mountains, 1girl",
    negativePrompt,
    inferenceStep: 30,
    seed,
  },
  {
    id: "dfd42fd5-0394-4810-92c6-cc907d3bfd1a",
    modelVersion:
      "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
    name: "Iridescence",
    prompt:
      "foil background, soft light, low contrast, minimalist, holographic, gradient",
    negativePrompt,
    inferenceStep: 30,
    seed,
  },
];
