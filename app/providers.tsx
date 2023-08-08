// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Switch: {
      variants: {
        glow: {
          thumb: {
            bg: "gray.50",
            _dark: {
              bg: "linear-gradient(to bottom, #FFF 0%, #A0AEC0 95%)",
            },
          },
          track: {
            p: "3px",
            bg: "gray.700",
            border: "solid 1px rgba(255, 255, 255, 0.2)",
            _dark: {
              bg: "blackAlpha.400",
            },
          },
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
