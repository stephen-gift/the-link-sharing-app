import { Box, VStack, Avatar, Text, Button } from "@chakra-ui/react";
import { FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";

const DLProfileCard = () => {
  return (
    <Box bg="white" borderRadius="lg" p={6} boxShadow="md" maxWidth="300px">
      <VStack spacing={4}>
        <Avatar size="xl" name="Ben Wright" src="/path-to-image.jpg" />
        <Text fontSize="xl" fontWeight="bold">
          Ben Wright
        </Text>
        <Text fontSize="sm" color="gray.500">
          ben@example.com
        </Text>

        <Button leftIcon={<FaGithub />} colorScheme="gray" width="full">
          GitHub
        </Button>
        <Button leftIcon={<FaYoutube />} colorScheme="red" width="full">
          YouTube
        </Button>
        <Button leftIcon={<FaLinkedin />} colorScheme="linkedin" width="full">
          LinkedIn
        </Button>
      </VStack>
    </Box>
  );
};
export default DLProfileCard;
