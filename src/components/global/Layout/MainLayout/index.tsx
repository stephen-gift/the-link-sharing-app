"use client";

import {
  Box,
  Circle,
  Flex,
  HStack,
  Image,
  Skeleton,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DLNavbar from "../../Navbar";
import DLPhoneMockup from "../../PhoneMockup";
import { Tab } from "../../Tabs";
import DLPreviewButton from "../../Button/PreviewButton";
import { listDocuments } from "@/app/appwrite";
import { Link } from "@/types/user";
import { useLinkStore } from "../../../../../store";

interface DLMainLayoutProps {
  children: React.ReactNode;
  tabs: Tab[];
  onTabChange: (activeTab: string) => void;
}

interface DocumentType {
  platform: string; // Adjust this field based on your actual document structure
}

const DLMainLayout = ({ children, tabs, onTabChange }: DLMainLayoutProps) => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useLinkStore();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await listDocuments<Link>();
        setDocuments(docs);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
    // Set up polling
    const intervalId = setInterval(fetchDocuments, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box maxH="100vh" bg="gray.50" display="flex" flexDirection="column">
      <VStack spacing={4} align="stretch" p={4} flex={1}>
        <DLNavbar tabs={tabs} onTabChange={onTabChange} />

        {/* Main content */}
        <Flex gap={4}>
          <Box
            h={"full"}
            flex={1.5}
            bg={"white.500"}
            display={["none", "none", "none", "block"]}
            borderRadius={10}
          >
            <DLPhoneMockup>
              <VStack spacing={4} align="stretch" w="full">
                <Circle
                  size="200px"
                  bg="gray.200"
                  alignSelf="center"
                  border={"2px"}
                >
                  {user?.prefs?.picture ? (
                    <Image
                      src={user.prefs.picture}
                      alt={user.name}
                      borderRadius="full"
                      boxSize="200px"
                      border={"2px"}
                    />
                  ) : (
                    <Skeleton  size="100px" />
                  )}
                </Circle>
                <Box textAlign="center">
                  {user?.name && <Box fontWeight="bold">{user.name}</Box>}
                  {user?.email && <Box color="gray.500">{user.email}</Box>}
                </Box>
                {loading ? (
                  <>
                    <Skeleton height="20px" width="80%" alignSelf="center" />
                    <Skeleton height="10px" width="60%" alignSelf="center" />
                    <Skeleton height="40px" />
                    <Skeleton height="40px" />
                    {/* Add more Skeletons if needed */}
                  </>
                ) : (
                  <VStack spacing={2}  overflowY="auto" w="full">
                    {documents.map((doc) => (
                      <DLPreviewButton
                        key={doc.platform}
                        label={doc.platform}
                      />
                    ))}
                  </VStack>
                )}
              </VStack>
            </DLPhoneMockup>
          </Box>

          {/* Main content area */}
          <Box flex={3} bg="white" borderRadius={10} boxShadow="sm">
            {children}
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DLMainLayout;
