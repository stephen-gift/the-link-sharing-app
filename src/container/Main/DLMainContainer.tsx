"use client";

import { DLLinkSection, DLMainLayout, DLProfileSection } from "@/components";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLink, BiUser } from "react-icons/bi";

const tabs = [
  { label: "Links", state: "links", icon: <BiLink /> },
  { label: "Profile Details", state: "profileDetails", icon: <BiUser /> },
];

const DLMainContainer = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.state || "");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = (activeTab: string) => {
    switch (activeTab) {
      case "links":
        return (
          <Box p={[0, 6, 6]}>
            <DLLinkSection />
          </Box>
        );
      case "profileDetails":
        return (
          <Box p={[0, 6, 6]}>
            <DLProfileSection />
          </Box>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <DLMainLayout tabs={tabs} onTabChange={handleTabChange}>
      {renderContent(activeTab)}
    </DLMainLayout>
  );
};

export default DLMainContainer;
