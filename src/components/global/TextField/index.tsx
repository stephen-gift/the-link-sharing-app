"use client";
import React, { ReactElement, ReactNode, useState } from "react";
import {
  Box,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  Text,
  FormLabel,
  FormHelperText,
  Flex,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { BiHide, BiLink, BiShow } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";

interface DLInputProps extends InputProps {
  error?: string;
  label?: string;
  helperText?: string;
  labelPosition?: "top" | "side";
  icon?: React.ElementType;
}

const DLInput = ({
  error,
  label,
  helperText,
  labelPosition = "top",
  icon = BiLink,
  type = "text",
  ...rest
}: DLInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const isError = !!error;
  const isFilled = !!rest.value;

  let borderColor = "gray.200";
  let bgColor = "white";
  if (isFocused) {
    borderColor = "purple.500";
    bgColor = "purple.50";
  }
  if (isError) {
    borderColor = "red.500";
    bgColor = "red.50";
  }

  const effectiveLabelPosition = useBreakpointValue({
    base: "top",
    md: labelPosition,
  });

  return (
    <FormControl isInvalid={isError}>
      <Flex
        direction={effectiveLabelPosition === "side" ? "row" : "column"}
        align={effectiveLabelPosition === "side" ? "center" : "flex-start"}
        mb={2}
        w={"full"}
      >
        {label && (
          <FormLabel
            flex={effectiveLabelPosition === "side" ? 1 : ""}
            fontSize="sm"
            fontWeight={500}
            mb={effectiveLabelPosition === "side" ? 0 : 1}
            mr={effectiveLabelPosition === "side" ? 4 : 0}
            minWidth={effectiveLabelPosition === "side" ? "120px" : "auto"}
            // textAlign={labelPosition === "side" ? "right" : "left"}
          >
            {label}
          </FormLabel>
        )}
        <Box flex={2} w={"full"}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon
                as={icon}
                color={
                  isError ? "red.500" : isFocused ? "purple.500" : "gray.400"
                }
              />
            </InputLeftElement>
            <Input
              w={"full"}
              {...rest}
              type={type === "password" && showPassword ? "text" : type}
              borderColor={borderColor}
              bg={bgColor}
              _hover={{ borderColor: isFocused ? "purple.500" : "gray.300" }}
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                bg: "purple.50",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              pl={10}
              borderRadius="md"
            />
            {isError && (
              <InputRightElement width="auto" pr={2}>
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              </InputRightElement>
            )}
            {type === "password" && (
              <InputRightElement
                width="auto"
                pr={2}
                cursor="pointer"
                onClick={togglePasswordVisibility}
              >
                <Icon as={showPassword ? BiHide : BiShow} color="gray.500" />
              </InputRightElement>
            )}
          </InputGroup>
          {helperText && (
            <Flex
              as={FormHelperText}
              gap={1}
              align="flex-start"
              fontSize={["xs", null, "sm"]}
              mt={1}
            >
              <Icon as={BsInfoCircleFill} />
              {helperText}
            </Flex>
          )}
        </Box>
      </Flex>
    </FormControl>
  );
};

export default DLInput;
