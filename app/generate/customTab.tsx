import {
  Image,
  Stack,
  VStack,
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
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function CustomTab() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <FormControl>
      <FormLabel mt={4}>
        <Code>prompt</Code>
      </FormLabel>
      <Input
        type="text"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
      />
      <FormHelperText>The prompt to guide QR Code generation.</FormHelperText>
      <FormLabel mt={8}>
        <Code>negative_prompt</Code>
      </FormLabel>
      <Input
        type="text"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
      />
      <FormHelperText>
        The negative prompt to guide QR Code generation.
      </FormHelperText>

      <FormLabel mt={8}>
        <Code>url</Code>
      </FormLabel>
      <Input
        type="text"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
      />
      <FormHelperText>The URL your QR Code will point to.</FormHelperText>

      <HStack
        justifyContent={"space-between"}
        mt={8}
        cursor={"pointer"}
        onClick={onToggle}
      >
        <Text textDecoration={"underline"}>Advanced options</Text>
        <Icon
          as={ChevronRightIcon}
          transition={"all .25s ease-in-out"}
          transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
        />
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <FormLabel mt={4}>
          <Code>num_inference_steps</Code>
        </FormLabel>
        <HStack>
          <NumberInput width={"25%"} mr={2} defaultValue={15} min={10} max={20}>
            <NumberInputField className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>
        <FormHelperText>
          Number of diffusion steps (minimum: 20; maximum: 100)
        </FormHelperText>

        <FormLabel mt={8}>
          <Code>guidance_scale</Code>
        </FormLabel>
        <HStack>
          <NumberInput width={"25%"} mr={2} defaultValue={15} min={10} max={20}>
            <NumberInputField className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>
        <FormHelperText>
          Scale for classifier-free guidance (minimum: 0.1; maximum: 30)
        </FormHelperText>

        <FormLabel mt={8}>
          <Code>batch_size</Code>
        </FormLabel>
        <HStack>
          <NumberInput width={"25%"} mr={2} defaultValue={15} min={10} max={20}>
            <NumberInputField className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>
        <FormHelperText>
          Batch size for this prediction (minimum: 1; maximum: 4)
        </FormHelperText>

        <FormLabel mt={8}>
          <Code>strength</Code>
        </FormLabel>
        <HStack>
          <NumberInput width={"25%"} mr={2} defaultValue={15} min={10} max={20}>
            <NumberInputField className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>
        <FormHelperText>
          Indicates how much to transform the masked portion of the reference
          `image`. Must be between 0 and 1. (maximum: 1)
        </FormHelperText>

        <FormLabel mt={8}>
          <Code>controlnet_conditioning_scale</Code>
        </FormLabel>
        <HStack>
          <NumberInput width={"25%"} mr={2} defaultValue={15} min={10} max={20}>
            <NumberInputField className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>
        <FormHelperText>
          The outputs of the controlnet are multiplied by
          `controlnet_conditioning_scale` before they are added to the residual
          in the original unet. (minimum: 1; maximum: 2)
        </FormHelperText>

        <FormLabel mt={8}>
          <Code>seed</Code>
        </FormLabel>
        <Input
          type="number"
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
        />
        <FormHelperText>Seed (0 = random, maximum: 2147483647)</FormHelperText>
      </Collapse>
    </FormControl>
  );
}
