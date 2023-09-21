"use client";

import Link from "next/link";
import Image from "next/image";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useEffect } from "react";
import {
  Cross2Icon,
  LockClosedIcon,
  LockOpen1Icon,
  MixerHorizontalIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SuccessIcon } from "./success-icon";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toggle } from "./ui/toggle";

import { PresetSelector } from "./preset-selector";
import { ModelSelector } from "@/components/preset-selectors/model-selector";
import { InferenceStepSelector } from "@/components/preset-selectors/inference-step-selector";
import { SeedField } from "@/components/preset-selectors/seed-field";
import { GuidanceSelector } from "@/components/preset-selectors/guidance-selector";
import { ControlNetConditioningSelector } from "@/components/preset-selectors/nateraw/controlnet-conditioning-selector";
import { NegativePromptField } from "@/components/preset-selectors/negative-prompt-field";

import { playgroundFormSchema } from "@/schemas/formSchemas";
import { Model, models, types } from "@/data/models";
import { Preset, presets } from "@/data/presets";
import { extractProgress } from "@/utils/helpers";
import { usePlaygroundForm } from "@/hooks/use-playground-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useRouter } from "next/navigation";

export default function Playground({ user }) {
  const router = useRouter();
  const form = usePlaygroundForm();
  const { toast } = useToast();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const [isCustom, setIsCustom] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(models[0]);

  // State management for Replicate prediction
  const [prediction, setPrediction] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Starting...");

  // Form states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    // List blob objects from Vercel Blob Storage
    const getBlobs = async () => {
      const res = await fetch("/api/blob/get-blobs");
      const data = await res.json();
      console.log(data);
    };
    getBlobs();
  }, []);

  async function onSubmit(values: z.infer<typeof playgroundFormSchema>) {
    console.log("values", values);
    setStatus("Starting...");
    setProgress(0);
    setPrediction(null);
    setSubmitting(true);

    // Upload image to Vercel Blob Storage
    try {
      if (file) {
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

        const blob = (await blobResponse.json()) as PutBlobResult;
        setBlob(blob);
      }
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

    // Make initial request to Lambda function to create a prediction
    const res = await fetch(
      "https://7vr3ybhge5.execute-api.us-east-1.amazonaws.com/prod/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, userId: user.id }),
      }
    );

    const response = await res.json();
    console.log("response", response);

    if (res.status !== 200 || response.status === "error") {
      setSubmitting(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.message || "Unknown error",
      });
      return;
    }

    // Extract the prediction ID from the returned URL for polling
    const predictionId = response.url.split("/").pop();

    // Poll the API Gateway endpoint for the status using the prediction ID
    let predictions = null;
    while (!predictions) {
      let pollRes = await fetch(
        `https://7vr3ybhge5.execute-api.us-east-1.amazonaws.com/prod/predictions/${predictionId}`,
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

    // Delete blob object from Vercel Blob Storage
    // if (blob) {
    //   try {
    //     const delBlobResponse = await fetch(
    //       `/api/blob/delete?url=${blob.url}`,
    //       {
    //         method: "POST",
    //       }
    //     );

    //     if (!delBlobResponse.ok) {
    //       throw new Error("Failed to delete file");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     toast({
    //       variant: "destructive",
    //       title: "Uh oh! Something went wrong.",
    //       description: error.message || "Unknown error",
    //     });
    //     setSubmitting(false);
    //     return;
    //   }
    // }

    // After 2 seconds of image generation success, restore button to default state
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  }

  const retrySubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
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
              <ModelSelector
                types={types}
                models={models}
                onModelChange={setSelectedModel}
                form={form}
              />
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
              <div className="grid h-full gap-5 lg:grid-cols-[1fr_420px]">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="input">Input</Label>
                      </div>
                    </div>

                    <PresetSelector
                      presets={presets}
                      onSelect={(preset) => {
                        setSelectedPreset(preset);
                        form.setValue("prompt", preset.prompt);
                        form.setValue("modelVersion", preset.modelVersion);
                        form.setValue("negativePrompt", preset.negativePrompt);
                        form.setValue("inferenceStep", preset.inferenceStep);
                        form.setValue("guidance", preset.guidance);
                        form.setValue("strength", preset.strength);
                        form.setValue(
                          "controlNetConditioning",
                          preset.controlNetConditioning
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
                            <Textarea
                              placeholder={
                                "a cubism painting of a town with a lot of houses in the snow with a sky background, Andreas Rocha, matte painting concept art, a detailed matte painting"
                              }
                              className="flex-1 min-h-[150px] lg:min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name="url"
                    render={({ field }) => (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <Input
                                disabled={true}
                                placeholder="https://glyph.so"
                              />
                            </FormItem>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            Custom domains are coming soon!
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(event) => {
                              console.log("file", file);
                              setFile(event.target.files[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  {/* {blob && (
                    <div>
                      Blob url: <a href={blob.url}>{blob.url}</a>
                    </div>
                  )} */}

                  <div className="flex flex-row items-center space-x-2">
                    {isSuccess ? (
                      <Button
                        className="w-full lg:w-auto min-w-[140px] duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
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
                              description: "Please log in to generate images.",
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

                {prediction && prediction.output ? (
                  <Link
                    href={prediction.output[prediction.output.length - 1]}
                    target="_blank"
                  >
                    <div className="bg-muted rounded-md border md:hover:bg-transparent md:hover:border-0 duration-150 ease-in-out mx-auto">
                      <Image
                        alt="QR Code"
                        src={prediction.output[prediction.output.length - 1]}
                        width={768}
                        height={768}
                        quality={100}
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="min-h-[300px] min-w-[320px] md:min-h-[420px] md:min-w-[420px] rounded-md border bg-muted relative mx-auto">
                    {isSubmitting && (
                      <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full gap-3">
                        <Label className="text-muted-foreground font-normal">
                          {status}
                        </Label>
                        <Progress className="w-1/2" value={progress} />
                        <div className="absolute bottom-4 w-full text-center text-slate-500 text-xs">
                          Takes 10-25 seconds to generate.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </form>
    </Form>
  );
}
