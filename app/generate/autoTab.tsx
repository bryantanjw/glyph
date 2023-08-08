import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  useColorModeValue as mode,
  Text,
  Stack,
  ScaleFade,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { themeType } from "@/utils/dropdownTypes";

const options = [
  {
    label: "Anime",
    prompt: "",
  },
  {
    label: "Cyberpunk",
    prompt: "",
  },
  {
    label: "Professional",
    prompt: "",
  },
  {
    label: "Vintage",
    prompt: "",
  },
];

type AutoTabProps = {
  theme: themeType | null;
  setTheme: (theme: themeType) => void;
};

export default function AutoTab({ theme, setTheme }: AutoTabProps) {
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Stack>
        <Menu matchWidth={true}>
          <MenuButton
            textAlign={"start"}
            variant={"outline"}
            boxShadow={"sm"}
            fontWeight={"normal"}
            rounded={"lg"}
            bg={mode("gray.50", "rgba(32, 34, 46, 0.3)")}
            textColor={mode("gray.600", "gray.300")}
            _active={{ bg: mode("gray.50", "") }}
            as={Button}
            rightIcon={<ChevronDownIcon ml={{ base: 5, md: 2 }} />}
          >
            {theme ?? "Choose a theme"}
          </MenuButton>
          <MenuList
            borderColor={mode("#CFDAE1", "rgb(255, 255, 255, 0.08)")}
            bg={"rgb(255,255,255,0.7)"}
            backdropFilter={"blur(10px)"}
            boxShadow={"md"}
          >
            <MenuOptionGroup
              type="radio"
              onChange={(value) => {
                setTheme(value as themeType);
              }}
            >
              {options.map((option, index) => (
                <MenuItemOption
                  key={index}
                  value={option.label}
                  color={"gray.600"}
                  _hover={{
                    transition: "all .3s ease",
                    color: "black",
                  }}
                  _checked={{
                    color: "black",
                  }}
                >
                  <Text>{option.label}</Text>
                </MenuItemOption>
              ))}
              ;
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Stack>
    </ScaleFade>
  );
}
