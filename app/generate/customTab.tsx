import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Code,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Collapse,
  useDisclosure,
  Text,
  Icon,
  useColorModeValue as mode,
  ScaleFade,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const InputFields = [
  {
    id: "prompt",
    labelText: "prompt",
    helperText: "The prompt to guide QR Code generation.",
    type: "text",
    inputProps: {
      type: "text",
      className:
        "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6",
    },
    sliderProps: {},
  },
  {
    id: "negative_prompt",
    labelText: "negative_prompt",
    helperText: "The negative prompt to guide QR Code generation.",
    type: "text",
    inputProps: {
      type: "text",
      className:
        "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6",
    },
    sliderProps: {},
  },
  {
    id: "url",
    labelText: "url",
    helperText: "The URL your QR Code will point to.",
    type: "text",
    inputProps: {
      type: "text",
      className:
        "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6",
    },
    sliderProps: {},
  },
];

const AdvancedFields = [
  {
    id: "num_inference_steps",
    labelText: "num_inference_steps",
    helperText: "Number of diffusion steps (minimum: 20; maximum: 100)",
    type: "slider",
    inputProps: { width: "25%", mr: 2, defaultValue: 15, min: 10, max: 20 },
    sliderProps: { ariaLabel: "slider-ex-1", defaultValue: 30 },
  },
  {
    id: "guidance_scale",
    labelText: "guidance_scale",
    helperText:
      "Scale for classifier-free guidance (minimum: 0.1; maximum: 30)",
    type: "slider",
    inputProps: { width: "25%", mr: 2, defaultValue: 15, min: 10, max: 20 },
    sliderProps: { ariaLabel: "slider-ex-1", defaultValue: 30 },
  },
  {
    id: "batch_size",
    labelText: "batch_size",
    helperText: "Batch size for this prediction (minimum: 1; maximum: 4)",
    type: "slider",
    inputProps: { width: "25%", mr: 2, defaultValue: 15, min: 10, max: 20 },
    sliderProps: { ariaLabel: "slider-ex-1", defaultValue: 30 },
  },
  {
    id: "strength",
    labelText: "strength",
    helperText:
      "Indicates how much to transform the masked portion of the reference `image`. Must be between 0 and 1. (maximum: 1)",
    type: "slider",
    inputProps: { width: "25%", mr: 2, defaultValue: 15, min: 10, max: 20 },
    sliderProps: { ariaLabel: "slider-ex-1", defaultValue: 30 },
  },
  {
    id: "controlnet_conditioning_scale",
    labelText: "controlnet_conditioning_scale",
    helperText:
      "The outputs of the controlnet are multiplied by `controlnet_conditioning_scale` before they are added to the residual in the original unet. (minimum: 1; maximum: 2)",
    type: "slider",
    inputProps: { width: "25%", mr: 2, defaultValue: 15, min: 10, max: 20 },
    sliderProps: { ariaLabel: "slider-ex-1", defaultValue: 30 },
  },
  {
    id: "seed",
    labelText: "seed",
    helperText: "Seed (0 = random, maximum: 2147483647)",
    type: "text",
    inputProps: {
      type: "number",
      className:
        "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6",
    },
  },
];

const InputField = ({
  labelText,
  helperText,
  type,
  inputProps,
  sliderProps,
}) => (
  <>
    <FormLabel mt={4}>
      <Code>{labelText}</Code>
    </FormLabel>
    {type === "text" && <Input {...inputProps} />}
    {type === "slider" && (
      <HStack>
        <NumberInput {...inputProps}>
          <NumberInputField className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider {...sliderProps}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
    )}
    <FormHelperText>{helperText}</FormHelperText>
  </>
);

export default function CustomTab() {
  const { isOpen, onToggle } = useDisclosure();
  const delay = 0.06;

  return (
    <FormControl>
      {InputFields.map((field, index) => (
        <ScaleFade initialScale={0.9} in={true} delay={index * delay}>
          <InputField
            key={field.id}
            labelText={field.labelText}
            helperText={field.helperText}
            type={field.type}
            inputProps={field.inputProps}
            sliderProps={field.sliderProps}
          />
        </ScaleFade>
      ))}

      <ScaleFade initialScale={0.9} in={true} delay={delay * 4}>
        <HStack
          justifyContent={"space-between"}
          mt={8}
          cursor={"pointer"}
          onClick={onToggle}
        >
          <Text textDecoration={"underline"}>Advanced options</Text>
          <Icon
            as={ChevronRightIcon}
            transition={"all .1s ease-in-out"}
            transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
          />
        </HStack>
      </ScaleFade>

      <Collapse in={isOpen} animateOpacity>
        {AdvancedFields.map((field, index) => (
          <ScaleFade initialScale={0.9} in={isOpen} delay={index * delay}>
            <InputField
              key={field.id}
              labelText={field.labelText}
              helperText={field.helperText}
              type={field.type}
              inputProps={field.inputProps}
              sliderProps={field.sliderProps}
            />
          </ScaleFade>
        ))}
      </Collapse>
    </FormControl>
  );
}
