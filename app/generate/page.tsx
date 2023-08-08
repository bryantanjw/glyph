"use client";
import { useState } from "react";
import {
  Image,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Switch,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import GenerateButton from "./generateButton";
import CustomTab from "./customTab";
import AutoTab from "./autoTab";
import TopNavBar from "@/components/TopNavBar";
import { GradientBg } from "@/components/GradientBg";
import { themeType } from "@/utils/dropdownTypes";

import { tabStyle } from "@/styles/TabToggleStyles";

export default function Form() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [theme, setTheme] = useState<themeType | null>(null);

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
      // body: JSON.stringify({ theme }),
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
    <div className="isolate bg-white px-6 py-8 lg:px-8 min-h-screen">
      <GradientBg />
      <TopNavBar />

      <div className="mx-auto mt-14 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Glyph
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Create Stylish AI-Generated QR Codes with Stable Diffusion.
        </p>
      </div>
      <Stack mt={12} direction={{ base: "column", md: "row" }}>
        <VStack p={4} ml={10} flex={1} alignItems={"stretch"}>
          <Heading
            mb={5}
            size={"lg"}
            fontWeight={"normal"}
            textColor={"gray.700"}
          >
            Input
          </Heading>

          <Tabs pt={4} index={tabIndex} variant={"unstyled"} isLazy>
            <FormControl
              display={"flex"}
              width={{ base: "full", md: "fit-content" }}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <TabList
                transition={"all 0.3s ease"}
                textColor={mode("gray.500", "gray.500")}
                display={"inline-flex"}
                backdropFilter={{ base: "", md: "blur(10px)" }}
                alignItems={"center"}
                border={mode(
                  "solid 1px rgba(0,0,0,0.1)",
                  "solid 1px rgba(255, 255, 255, 0.07)"
                )}
                rounded={"12px"}
                bg={mode("rgba(255,255,255,0.6)", "rgba(32, 34, 46, 0.5)")}
                boxShadow={"0px 2px 8px -1px #0000001a"}
                _hover={{
                  borderColor: mode(
                    "rgba(0,0,0,0.15)",
                    "rgba(255, 255, 255, 0.15)"
                  ),
                }}
              >
                <Tab mr={-2} sx={tabStyle} onClick={() => setTabIndex(0)}>
                  Auto
                </Tab>
                <FormLabel htmlFor="tab" />
                <Switch
                  id="tab"
                  variant={"glow"}
                  size={"md"}
                  isChecked={tabIndex === 1}
                  onChange={() => setTabIndex(tabIndex ? 0 : 1)}
                />
                <Tab sx={tabStyle} onClick={() => setTabIndex(1)}>
                  Custom
                </Tab>
              </TabList>
            </FormControl>

            <TabPanels>
              <TabPanel key={1} px={0}>
                <AutoTab theme={theme} setTheme={setTheme} />
              </TabPanel>

              <TabPanel key={2} px={0}>
                <CustomTab />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <GenerateButton
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            status={status}
            isDisabled={!theme}
          />
        </VStack>
        <Stack flex={1} p={4}>
          <Heading
            mb={5}
            size={"lg"}
            fontWeight={"normal"}
            textColor={"gray.700"}
          >
            Output
          </Heading>

          {error && <div>{error}</div>}

          {/* {prediction && (
            <div>
              {prediction.output && (
                <div>
                  <Image
                    objectFit={"contain"}
                    src={
                      "https://pbxt.replicate.delivery/Z2z9g1AjIa5tPltcp7K3UlB2vJCLq6FPmDBRXKU0tAoEderIA/output-0.png"
                    }
                    alt="output"
                    sizes="100vw"
                  />
                </div>
              )}
              <p>status: {prediction.status}</p>
            </div>
          )} */}
          <Image
            objectFit={"contain"}
            src={
              "https://pbxt.replicate.delivery/Z2z9g1AjIa5tPltcp7K3UlB2vJCLq6FPmDBRXKU0tAoEderIA/output-0.png"
            }
            alt="output"
            boxSize="fit-content"
          />
        </Stack>
      </Stack>
    </div>
  );
}
