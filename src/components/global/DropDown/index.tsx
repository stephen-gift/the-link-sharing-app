"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Divider,
} from "@chakra-ui/react";
import { BiChevronDown, BiLink } from "react-icons/bi";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitch,
  FaDev,
  FaCodepen,
  FaFreeCodeCamp,
  FaGitlab,
  FaStackOverflow,
} from "react-icons/fa";
import { SiHashnode } from "react-icons/si";

interface DLDropdownProps {
  options: string[];
  placeholder: string;
  defaultValue?: string;
  value: string;
  onChange: (selectedOption: string) => void;
}

const iconMap: Record<string, JSX.Element> = {
  GitHub: <FaGithub />,
  "Frontend Mentor": <FaDev />,
  Twitter: <FaTwitter />,
  LinkedIn: <FaLinkedin />,
  YouTube: <FaYoutube />,
  Facebook: <FaFacebook />,
  Twitch: <FaTwitch />,
  "Dev.to": <FaDev />,
  Codewars: <FaCodepen />,
  Codepen: <FaCodepen />,
  freeCodeCamp: <FaFreeCodeCamp />,
  GitLab: <FaGitlab />,
  Hashnode: <SiHashnode />,
  "Stack Overflow": <FaStackOverflow />,
};

const DLDropdown: FC<DLDropdownProps> = ({
  options,
  placeholder,
  defaultValue,
  value,
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultValue || value);
  const initialFocusRef = useRef(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Box mb={4} w="full">
      <Popover initialFocusRef={initialFocusRef} placement="bottom" matchWidth>
        {({ isOpen, onClose }) => (
          <>
            <Text size={'sm'}>Platform</Text>
            <PopoverTrigger>
              <Button
                w="full"
                justifyContent="space-between"
                borderColor={isOpen ? "primary.500" : "light.100"}
                _hover={{ borderColor: "primary.500" }}
                _focus={{
                  boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
                }}
                rightIcon={
                  <Icon
                    as={BiChevronDown}
                    transform={isOpen ? "rotate(180deg)" : undefined}
                    transition="transform 0.2s"
                  />
                }
              >
                <Box display="flex" alignItems="center">
                  {iconMap[selected] ? (
                    <Icon as={iconMap[selected].type} mr={2} />
                  ) : (
                    <BiLink />
                  )}
                  <Text>{selected || placeholder}</Text>
                </Box>
              </Button>
            </PopoverTrigger>
            <PopoverContent bg={"white.500"} w={"full"}>
              <PopoverBody p={0}>
                <VStack align="stretch" spacing={0} divider={<Divider />}>
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        handleSelect(option);
                        onClose();
                      }}
                      variant="ghost"
                      justifyContent="flex-start"
                      h="auto"
                      py={2}
                      px={4}
                      _hover={{ bg: "gray.100" }}
                      bg={selected === option ? "gray.50" : undefined}
                    >
                      <Box display="flex" alignItems="center" w="full">
                        {iconMap[option] && (
                          <Icon as={iconMap[option].type} mr={2} />
                        )}
                        <Text>{option}</Text>
                        {selected === option && (
                          <Text ml="auto" fontSize="sm" color="primary.500">
                            (Selected)
                          </Text>
                        )}
                      </Box>
                    </Button>
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </Box>
  );
};

export default DLDropdown;
