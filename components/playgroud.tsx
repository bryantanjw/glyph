"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

import { PresetSelector } from "./preset-selector";
import { BrightnessConditioningSelector } from "@/components/preset-selectors/tonyadastra/brightness-conditioning-selector";
import { ModelSelector } from "@/components/preset-selectors/model-selector";
import { InferenceStepSelector } from "@/components/preset-selectors/inference-step-selector";
import { TileConditioningSelector } from "@/components/preset-selectors/tonyadastra/tile-conditioning-selector";
import { SeedField } from "@/components/preset-selectors/seed-field";
import { StrengthSelector } from "@/components/preset-selectors/nateraw/strength-selector";
import { GuidanceSelector } from "@/components/preset-selectors/guidance-selector";
import { ControlNetConditioningSelector } from "@/components/preset-selectors/nateraw/controlnet-conditioning-selector";
import { NegativePromptField } from "@/components/preset-selectors/negative-prompt-field";

import { formSchema } from "@/schemas/formSchemas";
import { Model, models, types } from "@/app/data/models";
import { Preset, presets } from "@/app/data/presets";
import { extractProgress } from "@/utils/helpers";

const AnimatedSelectorDiv = ({ children, id }) => (
  <motion.div
    key={id}
    className="space-y-4"
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export default function Playground({ user }) {
  const { toast } = useToast();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const [isCustom, setIsCustom] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(models[0]);
  const [prompt, setPrompt] = useState<string | undefined>(undefined);

  // State management for Replicate prediction
  const [prediction, setPrediction] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Starting...");

  // Form states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // selectedPreset: presets.find((preset) => preset.name === "Futuristic"),
      prompt,
      url: "",
      negativePrompt: "ugly, disfigured, low quality, blurry, nsfw",
      inferenceStep: 80,
      guidance: 12,
      strength: 0.85,
      controlNetConditioning: 1.2,
      seed: 5,
    },
  });

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
      width: isSmallScreen ? "100%" : "75%",
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPrediction(null);
    setSubmitting(true);

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
          description: "Your image is ready for download.",
          action: (
            <ToastAction
              altText="Download image"
              onClick={() => {
                // TODO: Add download logic here
                console.log("Downloading image...");
              }}
            >
              Download image
            </ToastAction>
          ),
        });
      } else if (pollResponse.status === "failed") {
        setErrorMessage("Failed to generate image.");
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
        // Delay to make requests to API Gateway every 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5000));
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
    <div className="h-full flex-col md:flex pt-14 md:pt-20">
      <div className="container h-full py-6 flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex h-full items-stretch gap-8 xl:gap-4 2xl:gap-0">
              <motion.div
                initial="hidden"
                animate={isCustom ? "visible" : "hidden"}
                variants={slideInFromRight}
                className="flex-col flex-grow flex space-y-3 md:max-w-[240px] order-2 relative"
              >
                <div
                  className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  onClick={() => {
                    setIsCustom(false);
                  }}
                >
                  <Cross2Icon className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </div>
                <div className="mb-2">
                  <ModelSelector
                    types={types}
                    models={models}
                    onModelChange={setSelectedModel}
                  />
                  <div className="space-y-2 mb-2">
                    <NegativePromptField form={form} />
                    <InferenceStepSelector form={form} />
                    <GuidanceSelector form={form} />
                  </div>

                  {/* Vary selectors based on model selected */}
                  <AnimatePresence mode="wait">
                    {selectedModel?.name === "qrcode-sd" && (
                      <AnimatedSelectorDiv id="qrcode-sd">
                        <StrengthSelector form={form} />
                        <ControlNetConditioningSelector form={form} />
                        <SeedField form={form} />
                      </AnimatedSelectorDiv>
                    )}
                    {selectedModel?.name === "qart" && (
                      <AnimatedSelectorDiv id="qart">
                        <TileConditioningSelector defaultValue={[0.45]} />
                        <BrightnessConditioningSelector defaultValue={[1]} />
                      </AnimatedSelectorDiv>
                    )}
                  </AnimatePresence>
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
                <div className="md:flex md:flex-col space-y-4 lg:max-w-[900px] mx-auto">
                  <div className="grid h-full gap-5 md:gap-9 lg:grid-cols-[1fr_360px]">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <Label htmlFor="input">Input</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              name="show"
                              id="show"
                              checked={isCustom}
                              onCheckedChange={() =>
                                setIsCustom((prev) => !prev)
                              }
                            />
                            <Label
                              className="font-normal cursor-pointer"
                              htmlFor="show"
                            >
                              Custom
                            </Label>
                          </div>
                        </div>

                        <PresetSelector
                          presets={presets}
                          onSelect={(preset) => {
                            setSelectedPreset(preset);
                            setPrompt(preset.prompt);
                            form.setValue("prompt", preset.prompt);
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
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://www.glyph.so"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {prediction && prediction.output ? (
                      <motion.div
                        className="bg-muted rounded-md border md:hover:bg-transparent md:hover:border-0 duration-150 ease-in-out mx-auto"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Image
                          alt="QR Code"
                          src={prediction.output[prediction.output.length - 1]}
                          width={360}
                          height={360}
                          className="p-3 hover:p-0 transition-all duration-150 ease-in-out"
                        />
                      </motion.div>
                    ) : (
                      <div className="min-h-[300px] min-w-[320px] md:min-h-[360px] md:min-w-[360px] max-w-[450px] rounded-md border bg-muted relative mx-auto">
                        {isSubmitting && (
                          <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full gap-3">
                            <Label className="text-muted-foreground font-normal">
                              {status}
                            </Label>
                            <Progress className="w-1/2" value={progress} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col lg:flex-row items-center space-x-2">
                    {isSuccess ? (
                      <Button
                        className="w-full h-10 lg:w-auto min-w-[140px] duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                        style={{
                          boxShadow:
                            "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <SuccessIcon />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-10 lg:w-auto min-w-[140px] duration-150 hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] active:scale-95 scale-100 duration-75 disabled:cursor-not-allowed"
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
                            <Image
                              className="filter invert dark:filter-none lg:-ml-1"
                              width={18}
                              height={18}
                              src={"/sparkling-icon.png"}
                              alt={"Generate"}
                            />
                            <span>Generate</span>
                          </motion.div>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

// UNCOMMENT to simulate generation //
// async function simulateSubmit(values: z.infer<typeof formSchema>) {
//   setSubmitting(true);
//   setPrediction(null);
//   setProgress(0);

//   console.log("values", values);
//   const interval = setInterval(() => {
//     setProgress((prevProgress) => {
//       if (prevProgress >= 100) {
//         clearInterval(interval);
//         return 100;
//       }
//       return prevProgress + 1;
//     });
//   }, 13);

//   setTimeout(() => {
//     setSubmitting(false);
//     setIsSuccess(true);
//     setPrediction({
//       output: [
//         "https://pbxt.replicate.delivery/Z2z9g1AjIa5tPltcp7K3UlB2vJCLq6FPmDBRXKU0tAoEderIA/output-0.png",
//       ],
//       status: "success",
//     });

//     toast({
//       title: "QR code generated!",
//       description: "Your image is ready for download.",
//       action: (
//         <ToastAction
//           altText="Download image"
//           onClick={() => {
//             console.log("Downloading image...");
//           }}
//         >
//           Download image
//         </ToastAction>
//       ),
//     });

//     // After 2 seconds of setting isSuccess to true, set it to false
//     setTimeout(() => {
//       setIsSuccess(false);
//     }, 4000);
//   }, 1300);
// }
// END: Simulate generation //
