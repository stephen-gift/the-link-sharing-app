import React from "react";
import { Box, Container, VStack, Image, Center } from "@chakra-ui/react";

interface DLAuthLayoutProps {
  children: React.ReactNode;
}

const DLAuthLayout = ({ children }: DLAuthLayoutProps) => {
  return (
    <Container maxW="container.xl" h="100vh" centerContent>
      <Center h={'full'} w='full'>
        <VStack spacing={8} w="full" maxW="500px" pt={10}>
          <Image src="/images/Logo.svg" alt="Devlinks" h="40px" />

          <Box w="full" bg="white" borderRadius="lg" p={8} boxShadow="md">
            {children}
          </Box>
        </VStack>
      </Center>
    </Container>
  );
};

export default DLAuthLayout;
