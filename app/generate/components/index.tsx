"use client";

import { useState } from "react";
import Image from "next/image";
import { CounterClockwiseClockIcon, ReloadIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SuccessIcon } from "@/app/generate/components/success-icon";

import { UserNav } from "./user-nav";
import { CodeViewer } from "./code-viewer";
import { MaxLengthSelector } from "./maxlength-selector";
import { ModelSelector } from "./model-selector";
import { PresetSelector } from "./preset-selector";
import { PresetShare } from "./preset-share";
import { TemperatureSelector } from "./temperature-selector";
import { TopPSelector } from "./top-p-selector";
import { models, types } from "../data/models";
import { Preset, presets } from "../data/presets";

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
    width: "80%",
    transition: {
      duration: 0.25,
    },
  },
};

export default function PlaygroundPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const [isCustom, setIsCustom] = useState(false);

  // Inputs
  const [prompt, setPrompt] = useState<string | undefined>(undefined);

  // State management for Replicate prediction
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    // } else {
    //   setPrediction(prediction);
    //   setIsSuccess(true);
    //   console.log("prediction", prediction);
    // }
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);

      // After 2 seconds of setting isSuccess to true, set it to false
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }, 1300);
  };

  return (
    <div className="h-full flex-col md:flex">
      <div className="container flex items-center justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Glyph</h2>
        <div className="ml-auto flex space-x-3 sm:justify items-center">
          <div className="hidden space-x-5 md:flex items-center">
            <div className="flex items-center space-x-2">
              <Switch
                name="show"
                id="show"
                defaultChecked={false}
                onCheckedChange={() => setIsCustom((prev) => !prev)}
              />
              <Label className="font-normal" htmlFor="show">
                Custom
              </Label>
            </div>
            <div className="space-x-2">
              <CodeViewer />
              <PresetShare />
            </div>
          </div>
          <UserNav />
        </div>
      </div>
      <Separator />
      <div className="container h-full py-6 flex-1">
        <div className="flex h-full items-stretch gap-6">
          <motion.div
            initial="hidden"
            animate={isCustom ? "visible" : "hidden"}
            variants={slideInFromRight}
            className="flex-col flex space-y-4 sm:flex md:order-2"
          >
            <ModelSelector types={types} models={models} />
            <TemperatureSelector defaultValue={[0.56]} />
            <MaxLengthSelector defaultValue={[256]} />
            <TopPSelector defaultValue={[0.9]} />
          </motion.div>
          <motion.div
            className="md:order-1"
            initial="hidden"
            animate={isCustom ? "visible" : "hidden"}
            variants={gridVariants}
          >
            <div className="mt-0 border-0 p-0">
              <div className="flex flex-col space-y-4">
                <div className="grid h-full gap-6 lg:grid-cols-2">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="input">Input</Label>
                      <PresetSelector
                        presets={presets}
                        onSelect={(preset) => {
                          setSelectedPreset(preset);
                          setPrompt(preset.prompt);
                        }}
                        selectedPreset={selectedPreset}
                      />
                      <Textarea
                        id="input"
                        placeholder={
                          "a cubism painting of a town with a lot of houses in the snow with a sky background, Andreas Rocha, matte painting concept art, a detailed matte painting"
                        }
                        className="flex-1 min-h-[150px] lg:min-h-[300px]"
                        value={prompt ?? selectedPreset?.prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Textarea
                        id="website"
                        placeholder="https://www.glyph.ai"
                      />
                    </div>
                  </div>
                  <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted relative">
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
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="min-w-[140px] duration-150 hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] active:scale-95 scale-100 duration-75  disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <div className="flex items-center justify-center gap-x-2">
                            <span>Generate</span>
                            <Image
                              className="filter invert dark:filter-none"
                              width={18}
                              height={18}
                              src={"/sparkling-icon.png"}
                              alt={"Generate"}
                            />
                          </div>
                        )}
                      </Button>
                    </div>
                  )}
                  {/* <Button variant="secondary">
                    <span className="sr-only">Show history</span>
                    <CounterClockwiseClockIcon className="h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
