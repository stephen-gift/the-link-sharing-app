"use client";
import {
  Box,
  VStack,
  Image,
  Skeleton,
  useToast,
  Container,
} from "@chakra-ui/react";
import DLPreviewButton from "../global/Button/PreviewButton";
import { useLinkStore } from "../../../store";
import { useEffect, useState } from "react";
import { listDocuments } from "@/app/appwrite";
import { Link as DocumentLink } from "@/types/user";

interface DocumentType {
  platform: string;
  url: string;
}

const DLProfileCard = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useLinkStore();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await listDocuments<DocumentLink>();
        setDocuments(docs);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
    const intervalId = setInterval(fetchDocuments, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box borderRadius="lg">
      <Container maxW="container.xl">
        <VStack
          w={"full"}
          bg="white"
          borderRadius="lg"
          p={8}
          spacing={6}
          align="center"
          boxShadow="xl"
        >
          {loading ? (
            <Skeleton boxSize="200px" borderRadius="full" />
          ) : (
            <Image
              src={user?.prefs?.picture || ""}
              alt={user?.name || "Profile Picture"}
              borderRadius="full"
              boxSize="200px"
              border={"2px"}
            />
          )}

          <Box textAlign="center">
            {loading ? (
              <>
                <Skeleton height="20px" width="80%" />
                <Skeleton height="15px" width="60%" />
              </>
            ) : (
              <>
                {user?.name && <Box fontWeight="bold">{user.name}</Box>}
                {user?.email && <Box color="gray.500">{user.email}</Box>}
              </>
            )}
          </Box>

          <VStack spacing={2} maxH="300px" overflowY="auto" w="full">
            {loading ? (
              <>
                <Skeleton height="20px" width="80%" alignSelf="center" />
                <Skeleton height="10px" width="60%" alignSelf="center" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
              </>
            ) : (
              <VStack spacing={2} overflowY="auto" w="full">
                {documents.map((doc) => (
                  <DLPreviewButton
                    url={doc.url}
                    key={doc.platform}
                    label={doc.platform}
                  />
                ))}
              </VStack>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default DLProfileCard;
