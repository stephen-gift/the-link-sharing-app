import { Box, Image, keyframes, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const DLLoader = (props: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="#f6f6f6"
    >
      <VStack spacing={6} alignItems={'start'}>
        <Box animation={`${float} 3s ease-in-out infinite`}>
          <Image
            src="/images/Logo.svg"
            alt="Cloudflare Logo"
            width="200px"
            height="auto"
          />
        </Box>
        <Text fontSize="lg" color="#333">
          The DevLink dashboard is loading.
        </Text>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary.500"
          size="xl"
        />
      </VStack>
    </Box>
  );
};

export default DLLoader;
