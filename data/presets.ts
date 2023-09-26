export interface Preset {
  modelVersion: string;
  category: string;
  name: string;
  prompt: string;
  negativePrompt?: string;
  inferenceStep: number;
  guidance?: number;
  strength?: number;
  controlnetConditioning?: number;
  seed?: number;
  exampleImage?: string;
}

const negativePrompt = "ugly, disfigured, low quality, blurry, nsfw";
const seed = -1;
const controlnetConditioning = 2.1;
const guidance = 9.5;
const height = 768;
const width = 768;
const qrcode_background = "white";
const border = 1;

export const presets: Preset[] = [
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Cyberpunk anime",
    prompt: "A cyberpunk alleyway, anime, tokyo 2050",
    negativePrompt,
    inferenceStep: 55,
    guidance: 13,
    controlnetConditioning: 2.2,
    seed,
    exampleImage:
      "https://cdn.sanity.io/images/s3mrlbj8/production/293603ea3467f1656330b721d498aacd56d409ee-768x768.png",
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Andreas Rocha cubism",
    prompt:
      "a cubism painting of a town with a lot of houses in the snow with a sky background, Andreas Rocha, matte painting concept art, a detailed matte painting",
    negativePrompt,
    inferenceStep: 50,
    guidance: 7.5,
    controlnetConditioning: 1.0,
    seed,
    exampleImage:
      "https://cdn.sanity.io/images/s3mrlbj8/production/fcac945b61f9b3c5eabc8f22c6919adbb46903a9-768x768.png",
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Studio Ghibli anime",
    prompt:
      "portrait of cute girl, cloudy sky background lush landscape illustration concept art anime key visual trending pixiv fanbox by wlop and greg rutkowski and makoto shinkai and studio ghibli",
    negativePrompt:
      "lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, malformed mouth, malformed face, sunglasses, sitting, multiple faces, Watermark, Text, censored, deformed, bad anatomy, disfigured, poorly drawn face, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, disconnected head, malformed hands, long neck, mutated hands and fingers, bad hands, missing fingers, cropped, worst quality, low quality, mutation, poorly drawn, huge calf, bad hands, fused hand, missing hand, disappearing arms, disappearing thigh, disappearing calf, disappearing legs, missing fingers, fused fingers, abnormal eye proportion, Abnormal hands, abnormal legs, abnormal feet, abnormal fingers",
    inferenceStep: 40,
    guidance: 11.5,
    controlnetConditioning: 2.3,
    seed,
    exampleImage:
      "https://cdn.sanity.io/images/s3mrlbj8/production/f686c0af6278698995fe912fee1ef9279c993ee1-768x768.png",
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "Subliminal",
    name: "Medieval",
    prompt:
      "Medieval village scene with busy streets and castle in the distance",
    negativePrompt:
      "(worst quality, poor details:1.4), lowres, (artist name, signature, watermark:1.4), bad-artist-anime, bad_prompt_version2,  bad-hands-5, ng_deepnegative_v1_75t",
    inferenceStep: 20,
    guidance: 7.5,
    controlnetConditioning: 1.5,
    seed: 2145122936,
    exampleImage:
      "https://cdn.sanity.io/images/s3mrlbj8/production/708531aadd0e4bba0608ae8d74aa3703603c84ea-768x768.png",
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Abstract art",
    prompt:
      "abstract art, non-representative, non-figurative, abstract expressionism, cubist, modern art, geometric, minimalism, surreal, avant-garde ",
    negativePrompt,
    inferenceStep: 40,
    seed,
    guidance: 12,
    controlnetConditioning: 2.2,
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Neo Aztec",
    prompt: "a townhouse inspired by aztec architecture on a sunny day",
    negativePrompt,
    guidance,
    controlnetConditioning,
    inferenceStep: 30,
    seed,
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Forestpunk",
    prompt:
      "forestpunk, green pastures, lush environment, vivid colors, animation by studio ghibli",
    negativePrompt,
    guidance,
    controlnetConditioning,
    inferenceStep: 30,
    seed,
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Futuristic",
    prompt:
      "aerial view, a futuristic research complex in a bright foggy jungle, hard lighting",
    negativePrompt,
    inferenceStep: 80,
    guidance: 12,
    strength: 0.85,
    controlnetConditioning: 1.4,
    seed,
    exampleImage:
      "https://cdn.sanity.io/images/s3mrlbj8/production/d7316dd8f258780e011b5ccc292d78f2cbaa44cb-1024x1024.png",
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Darthouven Fish Men",
    prompt: "Darthouven Fish Men",
    negativePrompt,
    inferenceStep: 40,
    guidance: 7.5,
    controlnetConditioning: 2.2,
    seed,
    exampleImage:
      "https://cdn.sanity.io/images/s3mrlbj8/production/4197c26893fb2d7f99fe77931d4275809336a4f3-768x768.png",
  },
  {
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Japanese fusion",
    prompt: "Japanese painting, mountains",
    negativePrompt,
    guidance,
    controlnetConditioning: 1.2,
    inferenceStep: 30,
    seed,
    exampleImage:
      "https://cdn.sanity.io/images/s3mrlbj8/production/5be6c4ddbebdc7dfa14b2d0ecc1e61b0f8ea7452-768x768.png",
  },
];
