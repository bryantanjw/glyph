import React, { useState, useEffect } from "react";

import { InferenceStepsSelector } from "./preset-selectors/inference-steps-selector";
import { GuidanceSelector } from "./preset-selectors/guidance-selector";

function PresetControls({ selectedPreset }) {
  const [inferenceSteps, setInferenceSteps] = useState(50);
  const [guidance, setGuidance] = useState(10);

  useEffect(() => {
    if (selectedPreset.name === "Futuristic") {
      setInferenceSteps(80);
      setGuidance(12);
    }
  }, [selectedPreset]);

  return (
    <>
      <InferenceStepsSelector defaultValue={[inferenceSteps]} />
      <GuidanceSelector defaultValue={[guidance]} />
      {/* Add other selectors here */}
    </>
  );
}
