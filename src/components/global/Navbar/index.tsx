"use client";

import { Box, Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { BiHome, BiLink, BiUser } from "react-icons/bi";
import DLTabs, { Tab } from "../Tabs";
import DLButton from "../Button";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { account } from "@/app/appwrite";

interface DLNavbarProps {
  tabs: Tab[];
  onTabChange: (activeTab: string) => void;
}

const DLNavbar = ({ tabs, onTabChange }: DLNavbarProps) => {
  const router = useRouter();
  const buttonContent = useBreakpointValue({
    base: <Icon as={FaEye} boxSize={4} />,
    md: "Preview",
  });

  const handleClick = () => {
    router.push("/preview");
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      borderRadius={10}
      as={"nav"}
      justify="space-between"
      align="center"
      bg={"white.500"}
      p={4}
      w={"full"}
    >
      <Box>
        <Box display={["none", "none", "block"]}>
          <Image
            src="/images/Logo.svg"
            alt="Devlinks"
            height={24}
            width={100}
          />
        </Box>
        <Box display={["block", "block", "none"]}>
          <Image
            src="/images/LogoIcon.svg"
            alt="Devlinks"
            height={24}
            width={24}
          />
        </Box>
      </Box>
      <Flex>
        <DLTabs tabs={tabs} onTabChange={onTabChange} />
      </Flex>
      <Flex gap={2}>
        <DLButton
          p={2}
          onClick={handleClick}
          variant="secondary"
          state="default"
        >
          {buttonContent}
        </DLButton>
        <DLButton
          p={2}
          onClick={handleLogout}
          variant="secondary"
          state="default"
        >
          <LuLogOut />
        </DLButton>
      </Flex>
    </Flex>
  );
};

export default DLNavbar;
