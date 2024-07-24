"use client";

import {
  Box,
  Button,
  Image,
  Input,
  VStack,
  Text,
  Icon,
  useToast,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { BiTrash, BiUpload } from "react-icons/bi";

interface DLImageUploadProps {
  defaultImage?: string;
  onImageUpload?: (url: string) => void;
}

const DLImageUpload: FC<DLImageUploadProps> = ({
  defaultImage,
  onImageUpload,
}) => {
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const [isUploaded, setIsUploaded] = useState<boolean>(!!defaultImage);
  const toast = useToast();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setIsUploaded(true);
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (onImageUpload) {
          onImageUpload(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setIsUploaded(false);
    toast({
      title: "Image deleted successfully",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    if (onImageUpload) {
      onImageUpload("");
    }
  };

  return (
    <FormControl bg={"light.50"} p={5} borderRadius={10}>
      <Flex
        flexDir={["column", "column", "row"]}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <FormLabel color={"light.500"} flex={1}>
          Profile picture
        </FormLabel>
        <Flex
          flex={1}
          flexDir={["column", "column", "row"]}
          gap={5}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            position="relative"
            width="193px"
            height="193px"
            bg={isUploaded ? "transparent" : "gray.100"}
            borderRadius="md"
            overflow="hidden"
            border={isUploaded ? "none" : "1px dashed gray.300"}
          >
            {isUploaded && image ? (
              <>
                <Image
                  src={image}
                  alt="Uploaded Image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
                <Button
                  position="absolute"
                  top="2"
                  right="2"
                  colorScheme="red"
                  size="sm"
                  onClick={handleImageDelete}
                >
                  <Icon as={BiTrash} boxSize={4} />
                </Button>
              </>
            ) : (
              <VStack align="center" justify="center" height="100%" spacing={2}>
                <Icon as={BiUpload} boxSize={6} color="purple.500" />
                <Text fontSize="sm" color="gray.500">
                  No image uploaded
                </Text>
              </VStack>
            )}
          </Box>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            display="none"
            id="imageUpload"
          />
          <FormLabel htmlFor="imageUpload" mb={0}>
            <Button as="span" colorScheme="blue">
              Upload Image
            </Button>
          </FormLabel>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default DLImageUpload;
