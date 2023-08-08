import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Link,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function TopNavBar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"transaparent"}
        color={useColorModeValue("gray.600", "white")}
        py={{ base: 3 }}
        px={{ base: 4 }}
        minH={"70px"}
        alignSelf={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          mt={2}
          justify={{ base: "center", md: "left" }}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Glyph
          </Text>
        </Flex>

        <Flex display={{ base: "none", md: "flex" }} mr={12}>
          <DesktopNav />
        </Flex>

        <Stack
          flex={1}
          mt={2}
          justify={"flex-end"}
          direction={"row"}
          spacing={4}
        >
          {/* <ColorModeSwitcher /> */}

          <Flex display={{ base: "none", md: "block" }}>
            <Button fontWeight={"normal"} variant={"ghost"} rounded={"xl"}>
              Sign in
            </Button>
          </Flex>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.500", "gray.500");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("#F9FAFB", "gray.800");

  return (
    <Stack
      direction={"row"}
      spacing={2}
      rounded={"full"}
      px={2}
      py={4}
      boxShadow={"xl"}
      border={useColorModeValue(
        "1px solid #CFDAE1",
        "1px solid rgba(255, 255, 255, 0.08)"
      )}
      bg={useColorModeValue("rgb(255, 255, 255)", "rgb(26,32,44,0.6)")}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                href={navItem.href ?? "/#"}
                py={3}
                px={7}
                rounded={"full"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                isExternal={navItem.isExternal}
                transition={"all .2s ease"}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                _active={{
                  fontWeight: "medium",
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  bg: useColorModeValue(
                    "gray.100",
                    "radial-gradient(at center, hsl(0.00, 0%, 100%) -300%, transparent 40%)"
                  ),
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                mt={2}
                fontSize={"sm"}
                rounded={"xl"}
                minW={"xs"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <ChakraLink
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .1s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .1s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("#F9FAFB", "gray.900")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraLink}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <ChakraLink key={child.label} py={2} href={child.href}>
                {child.label}
              </ChakraLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  isExternal?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Explore",
    href: "/",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Docs",
    href: "https://docs.pascal.fi/",
    isExternal: true,
  },
  {
    label: "More",
    children: [
      {
        label: "Twitter",
        // subLabel: 'Trending Design to inspire you',
        href: "https://twitter.com/bryantanjw",
      },
    ],
  },
];
