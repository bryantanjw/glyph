import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

export function useSliderChange(form: UseFormReturn<any>, fieldName: string) {
  const { getValues, setValue } = form;
  const [value, setValueState] = useState(getValues(fieldName));

  const handleSliderChange = (val: number[]) => {
    const newValue = val[0];
    setValue(fieldName, newValue);
    setValueState(newValue);
  };

  return { value, handleSliderChange };
}
