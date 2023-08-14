"use client";

import { useState } from "react";
import Image from "next/image";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { CodeViewer } from "./code-viewer";
import { MaxLengthSelector } from "./maxlength-selector";
import { ModelSelector } from "./model-selector";
import { PresetActions } from "./preset-actions";
import { PresetSelector } from "./preset-selector";
import { PresetShare } from "./preset-share";
import { TemperatureSelector } from "./temperature-selector";
import { TopPSelector } from "./top-p-selector";
import { models, types } from "../data/models";
import { Preset, presets } from "../data/presets";

export default function PlaygroundPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();

  // Inputs
  const [prompt, setPrompt] = useState<string | undefined>(undefined);

  // State management for Replicate prediction
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 200));
    setSubmitting(true);
    const res = await fetch("/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ preset }),
    });

    let prediction = await res.json();
    if (res.status !== 200) {
      setError(prediction.detail);
    } else {
      setPrediction(prediction);
      setIsSuccess(true);
      console.log("prediction", prediction);
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 1300);
  };

  return (
    <div className="h-full flex-col md:flex">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Glyph</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <div className="hidden space-x-2 md:flex">
            <CodeViewer />
            <PresetShare />
          </div>
          <PresetActions />
        </div>
      </div>
      <Separator />
      <div className="container h-full py-6 flex-1">
        <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
          <div className="hidden flex-col space-y-4 sm:flex md:order-2">
            <ModelSelector types={types} models={models} />
            <TemperatureSelector defaultValue={[0.56]} />
            <MaxLengthSelector defaultValue={[256]} />
            <TopPSelector defaultValue={[0.9]} />
          </div>
          <div className="md:order-1">
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
                        className="flex-1 lg:min-h-[300px]"
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
                  <Button>Submit</Button>
                  <Button variant="secondary">
                    <span className="sr-only">Show history</span>
                    <CounterClockwiseClockIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
