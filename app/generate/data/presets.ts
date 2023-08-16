export interface Preset {
  id: string;
  name: string;
  prompt: string;
}

export const presets: Preset[] = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Anime",
    prompt: "test",
  },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    name: "Cyberpunk",
    prompt:
      "1mechanical girl,ultra realistic details, portrait, global illumination, shadows, octane render, 8k, ultra sharp,intricate, ornaments detailed, cold colors, metal, egypician detail, highly intricate details, realistic light, trending on cgsociety, glowing eyes, facing camera, neon details, machanical limbs,blood vessels connected to tubes,mechanical vertebra attaching to back,mechanical cervial attaching to neck,sitting,wires and cables connecting to head",
  },
  {
    id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
    name: "Vintage",
    prompt: "",
  },
  {
    id: "cc198b13-4933-43aa-977e-dcd95fa30770",
    name: "Tropical",
    prompt: "",
  },
  {
    id: "adfa95be-a575-45fd-a9ef-ea45386c64de",
    name: "Cinematic",
    prompt: "",
  },
  {
    id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
    name: "Neo Aztec",
    prompt: "",
  },
  {
    id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc",
    name: "Forestpunk",
    prompt:
      "forestpunk, green pastures, lush environment, vivid colors, animation by studio ghibli",
  },
  {
    id: "4641ef41-1c0f-421d-b4b2-70fe431081f3",
    name: "Minimalist",
    prompt:
      "interior of luxury condominium with minimalist furniture and lush house plants and abstract wall paintings | modern architecture by makoto shinkai, ilya kuvshinov, lois van baarle, rossdraws and frank lloyd wright",
  },
  {
    id: "48d34082-72f3-4a1b-a14d-f15aca4f57a0",
    name: "Japanese fusion",
    prompt: "Japanese painting, mountains, 1girl",
  },
  {
    id: "dfd42fd5-0394-4810-92c6-cc907d3bfd1a",
    name: "Iridescence",
    prompt:
      "foil background, soft light, low contrast, minimalist, holographic, gradient",
  },
];
