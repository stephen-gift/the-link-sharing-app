"use client";

import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { useState } from "react";

export interface Tab {
  label: string;
  state: string;
  icon: React.ReactElement;
}
interface CustomTabsProps {
  tabs: Tab[];
  onTabChange: (activeTab: string) => void; // Optional href array
}

const DLTabs = ({ tabs, onTabChange }: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.state || "");

  const handleTabClick = (state: string) => {
    setActiveTab(state);
    onTabChange(state); // Notify parent about active tab change
  };

  return (
    <Box>
      <Flex borderRadius="md">
        {tabs.map((tab) => (
          <Flex
            key={tab.state}
            align="center"
            borderRadius="md"
            bg={activeTab === tab.state ? "primary.100" : "transparent"}
            color={activeTab === tab.state ? "primary.500" : "light.500"}
            fontWeight="bold"
            mr={4}
            onClick={() => handleTabClick(tab.state)}
            _hover={{ color: "primary.500" }}
            cursor={"pointer"}
          >
            <IconButton
              aria-label={tab.label}
              icon={tab.icon}
              variant="ghost"
              size="sm"
              color="inherit"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              p={2}
            />
            <Text
              ml={2}
              display={{ base: "none", md: "inline" }}
              fontSize={{ base: "sm", md: "md" }}
              pr={2}
            >
              {tab.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default DLTabs;
