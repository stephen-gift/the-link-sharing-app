import { Box, Flex, Button } from "@chakra-ui/react";
import DLProfileCard from "./ProfileCard";

const DLPreview = () => {
  return (
    <Box maxHeight="100vh">
      <Flex justifyContent="space-between" p={4}>
        <Button variant="outline" colorScheme="whiteAlpha">
          Back to Editor
        </Button>
        <Button colorScheme="whiteAlpha">Share Link</Button>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 80px)"
      >
        <DLProfileCard />
      </Flex>
    </Box>
  );
};

export default DLPreview;
