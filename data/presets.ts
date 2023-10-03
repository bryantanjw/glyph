export interface ExampleImage {
  name: string;
  url: string;
}

export const exampleImages: ExampleImage[] = [
  {
    name: "https://glyph.so",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Glyph_QR-jPjQUqTP5VN05X9jLsv0PZWX7TAgeA.png",
  },
  {
    name: "Spiral",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Spiral-L4I9BVYlhyozp4BpQnw8xUT2JmGLVw.png",
  },
  {
    name: "2x2 Checkered Box",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Checkered_2x2-3NgtTA8ypxh8y0lRmCKtbOmsFc7lds.png",
  },
  {
    name: "4x4 Checkered Box",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Checkered_4x4-w7j0zRNh2MPgtzQYbSHjYeyagtFLbS.png",
  },
];

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
  image?: string;
  exampleOutput?: string;
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
    image: exampleImages[0].name,
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
    exampleOutput:
      "https://cdn.sanity.io/images/s3mrlbj8/production/293603ea3467f1656330b721d498aacd56d409ee-768x768.png",
  },
  {
    image: exampleImages[3].name,
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
    exampleOutput:
      "https://cdn.sanity.io/images/s3mrlbj8/production/fcac945b61f9b3c5eabc8f22c6919adbb46903a9-768x768.png",
  },
  {
    image: exampleImages[0].name,
    modelVersion:
      "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    category: "QR",
    name: "Studio Ghibli anime",
    prompt:
      "portrait of cute girl, cloudy sky background lush landscape illustration concept art anime key visual trending pixiv fanbox by wlop and greg rutkowski and makoto shinkai and studio ghibli",
    negativePrompt:
      "(worst quality, poor details:1.4), lowres, (artist name, signature, watermark:1.4), bad-artist-anime, bad_prompt_version2,  bad-hands-5, ng_deepnegative_v1_75t",
    inferenceStep: 40,
    guidance: 11.5,
    controlnetConditioning: 2.3,
    seed,
    exampleOutput:
      "https://cdn.sanity.io/images/s3mrlbj8/production/f686c0af6278698995fe912fee1ef9279c993ee1-768x768.png",
  },
  {
    image: exampleImages[2].name,
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
    exampleOutput:
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
    image: exampleImages[0].name,
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
    exampleOutput:
      "https://cdn.sanity.io/images/s3mrlbj8/production/7ebc0df749174ad5d877b17b4be974e96230606c-768x768.webp",
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
    exampleOutput:
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
    exampleOutput:
      "https://cdn.sanity.io/images/s3mrlbj8/production/4197c26893fb2d7f99fe77931d4275809336a4f3-768x768.png",
  },
  {
    image: exampleImages[0].name,
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
    exampleOutput:
      "https://cdn.sanity.io/images/s3mrlbj8/production/5be6c4ddbebdc7dfa14b2d0ecc1e61b0f8ea7452-768x768.png",
  },
];
