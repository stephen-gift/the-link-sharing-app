import React from "react";
import {
  Box,
  Flex,
  Text,
  Select,
  Input,
  Button,
  Icon,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { MdLink } from "react-icons/md";
import DLInput from "@/components/global/TextField";
import DLDropdown from "@/components/global/DropDown";
import { FiDelete } from "react-icons/fi";

export interface Link {
  $id?: string;
  platform: string;
  url: string;
}

interface LinkInputProps {
  link: Link;
  onChange: (id: number, field: "platform" | "url", value: string) => void;
  onRemove: () => void;
}

const LinkInput = ({ link, onChange, onRemove }: LinkInputProps) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      <HStack justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">Link #{link.id}</Text>
        <IconButton
          icon={<FiDelete />}
          onClick={onRemove}
          aria-label="Remove link"
          size="sm"
        />
      </HStack>
      <VStack align="stretch">
        <DLDropdown
          placeholder="Dropdown Field Default"
          options={["Item 1", "Item 2 (Selected)", "Item 3"]}
        />

        <DLInput
          placeholder="e.g. https://www.github.com/johnappleseed"
          icon={MdLink}
          value={link.url}
          onChange={(e) => onChange(link.id, "url", e.target.value)}
        />
      </VStack>
    </Box>
  );
};

export default LinkInput;
