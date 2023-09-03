"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SuccessIcon } from "@/app/home/success-icon";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ScrollArea } from "@/components/ui/scroll-area";

import { UserNav } from "@/app/home/user-nav";
import { CodeViewer } from "@/app/home/code-viewer";
import { PresetSelector } from "@/app/home/preset-selector";
import { PresetShare } from "@/app/home/preset-share";
import { BrightnessConditioningSelector } from "./home/preset-selectors/tonyadastra/brightness-conditioning-selector";
import { ModelSelector } from "@/app/home/preset-selectors/model-selector";
import { InferenceStepsSelector } from "@/app/home/preset-selectors/inference-steps-selector";
import { TileConditioningSelector } from "@/app/home/preset-selectors/tonyadastra/tile-conditioning-selector";
import { SeedField } from "./home/preset-selectors/seed-field";
import { StrengthSelector } from "./home/preset-selectors/nateraw/strength-selector";
import { GuidanceSelector } from "@/app/home/preset-selectors/guidance-selector";
import { ControlNetConditioningSelector } from "./home/preset-selectors/nateraw/controlnet-conditioning-selector";
import { NegativePromptField } from "@/app/home/preset-selectors/negative-prompt-field";

import { Model, models, types } from "./data/models";
import { Preset, presets } from "./data/presets";

// START: Animation //
const slideInFromRight = {
  hidden: { x: 100, opacity: 0, display: "none" },
  visible: {
    x: 0,
    opacity: 1,
    display: "flex",
    transition: {
      delay: 0.2,
    },
  },
};

const gridVariants = {
  hidden: { width: "100%" },
  visible: {
    width: "75%",
    transition: {
      duration: 0.25,
    },
  },
};

const AnimatedSelectorDiv = ({ children, key }) => (
  <motion.div
    key={key}
    className="space-y-4"
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
// END: Animation //

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is empty.",
  }),
  url: z.string().min(1, {
    message: "Website URL is empty.",
  }),
});

export default function PlaygroundPage() {
  const { toast } = useToast();

  // Inputs
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const [isCustom, setIsCustom] = useState(false);
  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<Model | null>(models[0]);

  // State management for Replicate prediction
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Form states
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt,
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setSubmitting(true);
    // const res = await fetch("/api/predictions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // body: JSON.stringify({ preset }),
    // });

    // let prediction = await res.json();
    // if (res.status !== 200) {
    //   setError(prediction.detail);
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "prediction.detail",
    //     action: <ToastAction altText="Try again">Try again</ToastAction>,
    //   });
    // } else {
    //   setPrediction(prediction);
    //   setIsSuccess(true);
    //   toast({
    //     title: "QR Code generated!",
    //     description: "Your image is ready for download.",
    //     action: (
    //       <ToastAction
    //         altText="Download image"
    //         onClick={() => {
    //           // Add your download logic here
    //           console.log("Downloading image...");
    //         }}
    //       >
    //         Download image
    //       </ToastAction>
    //     ),
    //   });
    //   console.log("prediction", prediction);
    // }

    // Simulate generation //
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 13);

    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "QR Code generated!",
        description: "Your image is ready for download.",
        action: (
          <ToastAction
            altText="Download image"
            onClick={() => {
              // Add your download logic here
              console.log("Downloading image...");
            }}
          >
            Download image
          </ToastAction>
        ),
      });

      // After 2 seconds of setting isSuccess to true, set it to false
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }, 1300);
  }

  return (
    <div className="h-full flex-col md:flex">
      <div className="container flex items-center justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Glyph</h2>
        <div className="ml-auto flex space-x-3 sm:justify items-center">
          <div className="hidden space-x-5 md:flex items-center">
            <div className="space-x-2">
              <CodeViewer />
              <PresetShare />
            </div>
            <UserNav />
          </div>
        </div>
      </div>
      <Separator />

      <div className="container h-full py-6 flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex h-full items-stretch gap-6 xl:gap-0">
              <motion.div
                initial="hidden"
                animate={isCustom ? "visible" : "hidden"}
                variants={slideInFromRight}
                className="flex-col flex space-y-3 lg:max-w-[360px] md:order-2"
              >
                <ModelSelector
                  types={types}
                  models={models}
                  onModelChange={setSelectedModel}
                />
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    <NegativePromptField />
                    <InferenceStepsSelector defaultValue={[80]} />
                    <GuidanceSelector defaultValue={[12]} />
                  </div>

                  {/* Vary selectors based on model selected */}
                  <AnimatePresence mode="wait">
                    {selectedModel?.name === "qrcode-sd" && (
                      <AnimatedSelectorDiv key="qrcode-sd">
                        <StrengthSelector defaultValue={[0.9]} />
                        <ControlNetConditioningSelector defaultValue={[1.5]} />
                        <SeedField />
                      </AnimatedSelectorDiv>
                    )}
                    {selectedModel?.name === "qart" && (
                      <AnimatedSelectorDiv key="qart">
                        <TileConditioningSelector defaultValue={[0.45]} />
                        <BrightnessConditioningSelector defaultValue={[1]} />
                      </AnimatedSelectorDiv>
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </motion.div>
              <motion.div
                className="md:order-1 mt-0 border-0 p-0"
                initial="hidden"
                animate={isCustom ? "visible" : "hidden"}
                variants={gridVariants}
              >
                <div className="flex flex-col space-y-4 lg:max-w-[900px] mx-auto">
                  <div className="grid h-full gap-6 lg:grid-cols-2">
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
                              defaultChecked={isCustom}
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
                    <div className="mt-[21px] min-h-[300px] rounded-md border bg-muted relative">
                      {isSubmitting && (
                        <Progress
                          className="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          value={progress}
                        />
                      )}
                      {prediction && (
                        <div>
                          {prediction.output && (
                            <Image
                              alt="QR Code"
                              src={
                                prediction.output[prediction.output.length - 1]
                              }
                              layout="fill"
                              objectFit="contain"
                              className="p-8"
                            />
                          )}
                          <p>status: {prediction.status}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isSuccess ? (
                      <Button
                        className="min-w-[140px] duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                        style={{
                          boxShadow:
                            "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <SuccessIcon />
                      </Button>
                    ) : (
                      <div className="flex flex-row gap-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="min-w-[140px] duration-150 hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] active:scale-95 scale-100 duration-75  disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <motion.div
                              className="flex items-center justify-center gap-x-2"
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span>Generate</span>
                              <Image
                                className="filter invert dark:filter-none"
                                width={18}
                                height={18}
                                src={"/sparkling-icon.png"}
                                alt={"Generate"}
                              />
                            </motion.div>
                          )}
                        </Button>
                      </div>
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
