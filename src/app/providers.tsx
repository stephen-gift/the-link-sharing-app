"use client";

import customTheme from "@/utils/customTheme";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
