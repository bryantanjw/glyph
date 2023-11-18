"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useEffect } from "react";
import {
  Cross2Icon,
  LockClosedIcon,
  LockOpen1Icon,
  MixerHorizontalIcon,
  PlusCircledIcon,
  ReloadIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import promptmaker from "promptmaker";
import { User } from "@supabase/supabase-js";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { SuccessIcon } from "./success-icon";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Row } from "./ui/row";
import { Column } from "./ui/column";
import { Toggle } from "./ui/toggle";

import { ImageSelector } from "./image-selector";
import { PresetSelector } from "./preset-selector";
import { ModelSelector } from "@/components/preset-selectors/model-selector";
import { InferenceStepSelector } from "@/components/preset-selectors/inference-step-selector";
import { SeedField } from "@/components/preset-selectors/seed-field";
import { GuidanceSelector } from "@/components/preset-selectors/guidance-selector";
import { ControlNetConditioningSelector } from "@/components/preset-selectors/controlnet-conditioning-selector";
import { NegativePromptField } from "@/components/preset-selectors/negative-prompt-field";

import { playgroundFormSchema } from "@/utils/formSchemas";
import { Model, models } from "@/data/models";
import { Preset } from "@/data/presets";
import { extractProgress } from "@/utils/helpers";
import { usePlaygroundForm } from "@/hooks/use-playground-form";
import ExampleTemplatesSection from "./example-templates-section";
import { ShareImage } from "./share-image";

interface PlaygroundProps {
  user: User | null | undefined;
  userDetails?: any;
  subscription?: any;
  data?: any;
}

export default function Playground({
  user,
  userDetails,
  subscription,
  data,
}: PlaygroundProps) {
  const router = useRouter();
  const form = usePlaygroundForm();
  const { toast } = useToast();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [prompt, setPrompt] = useState(() => promptmaker());
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const [isCustom, setIsCustom] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(models[0]);

  // State management for Replicate prediction
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Starting...");
  const [prediction, setPrediction] = useState(null);

  // Form states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const slideInFromRight = {
    hidden: {
      x: 50,
      opacity: 0,
      display: "none",
    },
    visible: {
      x: 0,
      opacity: 1,
      display: "flex",
      transition: {
        delay: isSmallScreen ? 0 : 0.2,
      },
    },
  };

  const gridVariants = {
    hidden: {
      width: "100%",
      display: isSmallScreen ? "block" : "normal",
    },
    visible: {
      width: isSmallScreen ? "100%" : "73%",
      display: isSmallScreen ? "none" : "normal",
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(() => {
    if (data) {
      form.setValue("prompt", data.input.prompt);
      form.setValue("negativePrompt", data.input.negative_prompt);
      form.setValue("inferenceStep", data.input.num_inference_steps);
      form.setValue("guidance", data.input.guidance_scale);
      form.setValue(
        "controlnetConditioning",
        data.input.controlnet_conditioning_scale
      );
      form.setValue("seed", data.input.seed);
    }
  }, [data, form]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    // Check screen size on mount and update isSmallScreen state
    checkScreenSize();
    // Update isSmallScreen state when the window is resized
    window.addEventListener("resize", checkScreenSize);
    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  /* UMCONMMENT to List blob objects from Vercel Blob Storage and delete them */
  // useEffect(() => {
  //   const getBlobs = async () => {
  //     const res = await fetch("/api/blob/get-blobs");
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   getBlobs();

  //   const deleteBlob = async () => {
  //     const urls = [
  //       "ADD_URLS_TO_DELETE_HERE",
  //     ];

  //     const delBlobResponse = await fetch("/api/blob/delete", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ urls }), // Send the URLs in the request body
  //     });

  //     if (!delBlobResponse.ok) {
  //       throw new Error("Failed to delete file");
  //     }
  //     console.log("delBlobResponse", delBlobResponse);
  //   };
  //   deleteBlob();
  // }, []);

  async function handleDeleteBlob(blobUrl: string) {
    try {
      const delBlobResponse = await fetch(`/api/blob/delete?url=${blobUrl}`, {
        method: "DELETE",
      });

      if (!delBlobResponse.ok) {
        throw new Error("Failed to delete file");
      }
      console.log("delBlobResponse", delBlobResponse);
    } catch (error) {
      console.error("delBlobResponse", error);
      setSubmitting(false);
    }
  }

  async function onSubmit(values: z.infer<typeof playgroundFormSchema>) {
    setStatus("Starting...");
    setImageLoaded(false);
    setProgress(0);
    setPrediction(null);
    setSubmitting(true);

    // Upload image to Vercel Blob Storage
    let blob;
    if (file) {
      console.log("file", file);
      try {
        const blobResponse = await fetch(
          `/api/blob/upload?filename=${file.name}`,
          {
            method: "POST",
            body: file,
          }
        );

        if (!blobResponse.ok) {
          throw new Error("Failed to upload file");
        }

        blob = (await blobResponse.json()) as PutBlobResult;
        console.log("blob", blob);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message || "Unknown error",
        });
        setSubmitting(false);
        return;
      }
    }

    if (blob || values.image) {
      // Make initial request to Lambda function to create a prediction
      const res = await fetch("https://api.glyph.so/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: user.id,
          image: blob ? blob.url : values.image,
          subscription_tier: subscription?.price_id,
        }),
      });

      const response = await res.json();
      console.log("response", response);

      if (res.status !== 200 || response.status === "error") {
        if (response.message === "You have insufficient credits.") {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "You have no credits left. You can continue to use Glyph for free at a limited capacity, but you won't be able to upload your own image.",
            action: (
              <ToastAction
                altText="Add credits"
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                <PlusCircledIcon className="mr-2" /> Add credits
              </ToastAction>
            ),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: response.message || "Unknown error",
          });
        }
        setSubmitting(false);
        return;
      }

      // Extract the prediction ID from the returned URL for polling
      const predictionId = response.url.split("/").pop();

      // Poll the API Gateway endpoint for the status using the prediction ID
      let predictions = null;
      while (!predictions && predictionId) {
        let pollRes = await fetch(
          `https://api.glyph.so/predictions/${predictionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + process.env.REPLICATE_API_KEY,
            },
          }
        );
        let pollResponse = await pollRes.json();
        console.log("pollResponse", pollResponse);
        const { status, logs } = pollResponse;

        if (status === "processing") {
          setStatus("Generating...");
        } else {
          setStatus(status.charAt(0).toUpperCase() + status.slice(1) + "...");
        }
        const progress = extractProgress(logs);
        if (progress !== null) {
          setProgress(progress);
        }

        if (pollResponse.status === "succeeded") {
          predictions = pollResponse;
          setPrediction(predictions);
          setIsSuccess(true);
          setSubmitting(false);
          toast({
            title: "QR Code generated!",
          });
        } else if (pollResponse.status === "failed") {
          setSubmitting(false);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: pollResponse.message || "Image generation failed.",
            action: (
              <ToastAction altText="Try again" onClick={retrySubmit}>
                Try again
              </ToastAction>
            ),
          });
          break;
        } else {
          // Delay to make requests to API Gateway every 3 seconds
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }

      // Delete blob object from Vercel Blob Storage after generation
      if (blob) {
        await handleDeleteBlob(blob.url);
      }
    }
    // After 2 seconds of image generation success, restore button to default state
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  }

  const retrySubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <Column className="gap-8 w-full px-8 md:px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex h-full items-stretch gap-5">
              <motion.div
                initial="hidden"
                animate={isCustom ? "visible" : "hidden"}
                variants={slideInFromRight}
                className="flex-col flex-grow flex space-y-3 order-2 relative"
              >
                <div
                  className="absolute md:hidden right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  onClick={() => {
                    setIsCustom(false);
                  }}
                >
                  <Cross2Icon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </div>
                <div className="mb-2">
                  {/* <ModelSelector
                    types={types}
                    models={models}
                    onModelChange={setSelectedModel}
                    form={form}
                  /> */}
                  <div className="space-y-2 mb-2">
                    <NegativePromptField form={form} />
                    <InferenceStepSelector form={form} />
                    <GuidanceSelector form={form} />
                    <ControlNetConditioningSelector form={form} />
                    <SeedField form={form} />
                  </div>
                </div>
                <Button
                  className="md:hidden h-10"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsCustom((prev) => !prev);
                  }}
                >
                  Save
                </Button>
              </motion.div>
              <motion.div
                className="order-1 mt-0 border-0 p-0"
                initial="hidden"
                animate={isCustom ? "visible" : "hidden"}
                variants={gridVariants}
              >
                <div className="md:flex md:flex-col space-y-4 mx-auto">
                  <div className="grid h-full gap-5 lg:grid-cols-[1fr_500px]">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div>
                          <Label htmlFor="input">Input</Label>
                        </div>

                        <PresetSelector
                          onSelect={(preset) => {
                            setSelectedPreset(preset);
                            form.setValue("prompt", preset.prompt);
                            form.setValue("modelVersion", preset.modelVersion);
                            form.setValue(
                              "negativePrompt",
                              preset.negativePrompt
                            );
                            form.setValue(
                              "inferenceStep",
                              preset.inferenceStep
                            );
                            form.setValue("guidance", preset.guidance);
                            form.setValue("strength", preset.strength);
                            form.setValue(
                              "controlnetConditioning",
                              preset.controlWeight
                            );
                            form.setValue("seed", preset.seed);
                          }}
                          selectedPreset={selectedPreset}
                        />
                        <FormField
                          control={form.control}
                          name="prompt"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="textarea-container relative">
                                  <Textarea
                                    placeholder={prompt}
                                    className="flex-1 min-h-[150px] lg:min-h-[200px] transition duration-200 focus:ring-2 focus:ring-blue-500"
                                    onKeyDown={(event) => {
                                      if (event.key === "Tab") {
                                        event.preventDefault(); // Prevent focus from moving to the next element
                                        field.onChange(
                                          event.currentTarget.placeholder
                                        );
                                      } else if (
                                        event.key === "]" &&
                                        event.metaKey
                                      ) {
                                        event.preventDefault();
                                        if (field.value.trim() !== "") {
                                          setPrompt(promptmaker()); // Generate a new prompt
                                          field.onChange(promptmaker());
                                        } else {
                                          setPrompt(promptmaker());
                                        }
                                      }
                                    }}
                                    {...field}
                                  />
                                  <Button
                                    className="absolute right-3 bottom-3 md:hidden"
                                    variant="ghost"
                                    size="icon"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setPrompt(promptmaker());
                                      field.onChange(promptmaker());
                                    }}
                                  >
                                    <UpdateIcon />
                                  </Button>
                                  <div className="kbd-div hidden md:block absolute right-5 bottom-5 space-y-4 text-xs text-gray-600 dark:text-gray-200 justify-start">
                                    <div>
                                      <kbd className="mr-1 h-5 py-0.5 px-1.5 bg-white border border-gray-200 font-mono text-sm text-gray-500 rounded-md shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]">
                                        ⌘
                                      </kbd>
                                      <kbd className="mr-1 h-5 py-1 px-1.5 bg-white border border-gray-200 font-mono text-xs text-gray-500 rounded-md shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]">
                                        ]
                                      </kbd>{" "}
                                      Next
                                    </div>
                                    <div>
                                      <kbd className="mr-1 h-5 py-1 px-1.5 bg-white border border-gray-200 font-mono text-xs text-gray-500 rounded-md shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]">
                                        Tab
                                      </kbd>{" "}
                                      Autocomplete
                                    </div>
                                  </div>
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageSelector
                                file={file}
                                setFile={setFile}
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                onSelect={(image) => {
                                  setSelectedImage(image);
                                  form.setValue("image", image.url);
                                }}
                                form={form}
                                userDetails={userDetails}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-row items-center space-x-2">
                        {isSuccess ? (
                          <Button
                            className="w-full text-white lg:w-auto min-w-[140px] duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                            style={{
                              boxShadow:
                                "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            <SuccessIcon />
                          </Button>
                        ) : (
                          <Button
                            disabled={isSubmitting}
                            onClick={async (event) => {
                              event.preventDefault();
                              if (!user) {
                                toast({
                                  description:
                                    "Please log in to generate images.",
                                  action: (
                                    <ToastAction
                                      altText="Log In"
                                      onClick={() => {
                                        router.push("/signin");
                                      }}
                                    >
                                      <LockOpen1Icon className="mr-2" /> Log In
                                    </ToastAction>
                                  ),
                                });
                              } else {
                                const isValid = await form.trigger();
                                if (isValid) {
                                  onSubmit(form.getValues());
                                }
                              }
                            }}
                            className="w-full lg:w-auto min-w-[140px] duration-150 hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] active:scale-95 scale-100 duration-75 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <motion.div
                                className="flex items-center justify-center gap-x-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                {user ? (
                                  <Image
                                    className="filter invert dark:filter-none lg:-ml-1"
                                    width={18}
                                    height={18}
                                    src={"/sparkling-icon.png"}
                                    alt={"Generate"}
                                  />
                                ) : (
                                  <LockClosedIcon className="h-4 w-4" />
                                )}
                                <span>Generate</span>
                              </motion.div>
                            )}
                          </Button>
                        )}
                        <Toggle
                          aria-label="Toggle customize"
                          className="bg-accent"
                          onPressedChange={() => setIsCustom((prev) => !prev)}
                        >
                          <MixerHorizontalIcon />
                        </Toggle>
                      </div>
                    </div>
                    <div className="min-h-[300px] min-w-[320px] md:min-h-[500px] md:min-w-[500px] rounded-md border bg-muted relative mx-auto">
                      {isSubmitting ? (
                        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full gap-3">
                          <Label className="text-muted-foreground font-normal">
                            {status}
                          </Label>
                          <Progress className="w-1/2" value={progress} />
                          <div className="absolute bottom-4 w-full text-center text-slate-500 text-xs">
                            Takes 8-20 seconds to generate.
                          </div>
                        </div>
                      ) : prediction?.output || data ? (
                        <div className="relative md:min-h-[420px] md:min-w-[420px] flex bg-muted rounded-md overflow-hidden group">
                          <Link
                            href={prediction?.output[0] || data?.output[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              alt="Glyph image output"
                              src={prediction?.output[0] || data?.output[0]}
                              width={768}
                              height={768}
                              quality={100}
                              onLoad={() => setImageLoaded(true)}
                              className="object-cover transition-all hover:scale-105"
                            />
                          </Link>
                          <div className="absolute top-0 right-0 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShareImage
                              image={`https://glyph.so/t/${
                                prediction?.id ?? data?.id
                              }`}
                            />
                          </div>
                        </div>
                      ) : selectedImage ? (
                        <div className="min-h-[300px] min-w-[320px] md:min-h-[500px] md:min-w-[500px] rounded-md border bg-muted relative mx-auto">
                          <Image
                            alt="Selected image"
                            src={selectedImage.url}
                            width={768}
                            height={768}
                            quality={100}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </form>
        </Form>
      </Column>

      <Row className="my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
      <Column className="w-full items-center justify-start px-8 md:px-5 lg:px-0">
        <Column className="w-full space-y-1">
          <p className="text-xl font-semibold">Need inspiration?</p>
          <p className="text-md text-muted-foreground pb-5">
            Try out one of the prompts below.
          </p>
        </Column>
        <ExampleTemplatesSection
          form={form}
          setSelectedImage={setSelectedImage}
        />
      </Column>
    </>
  );
}
