import { FC, ReactNode } from "react";
import { Box, Center, Container, Image } from "@chakra-ui/react";

const DLPhoneMockup: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container
      maxW="container.lg"
      mt={10}
      display="flex"
      justifyContent="center"
    >
      <Box
        position="relative"
        width={["90%", "80%", "375px"]}
        height={["60vh", "70vh", "667px"]}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={"/images/PhoneWrapper.png"}
          alt="phonewrapper"
          width="full"
          height="full"
          position="absolute"
          zIndex={1}
          // p={2} // Add padding to create spacing
        />
        <Image
          src={"/images/Phone.png"}
          alt="phone"
          width="full"
          height="full"
          position="absolute"
          zIndex={2}
          p={3} // Add padding to create spacing
        />
        <Center
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="90%"
          height="80%"
          zIndex={3}
          bg="white"
          borderRadius="md"
          overflow="hidden"
        >
          <Box
            width="100%"
            height="100%"
            overflowY="auto" // Make the content scrollable
            p={4}
            bg="white" // Ensure the background is consistent
          >
            {children}
          </Box>
        </Center>
      </Box>
    </Container>
  );
};

export default DLPhoneMockup;
