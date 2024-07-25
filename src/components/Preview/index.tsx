"use client";
import {
  Box,
  Flex,
  Button,
  Center,
  Link,
  Icon,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import DLProfileCard from "./ProfileCard";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { account } from "@/app/appwrite";

const DLPreview = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentUser, setCurrentUser] = useState<Models.User<{}> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { hasCopied, onCopy } = useClipboard(currentUrl || "");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = () => {
    onCopy();
    toast({
      title: "Link copied!",
      description: "The profile link has been copied to your clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setCurrentUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    getUser();
  }, []);
  return (
    <Box maxHeight="100vh" pos={"relative"}>
      <Flex justifyContent="space-between" mb={8}>
        {isLoggedIn && (
          <Link
            href="/profile"
            color="white"
            display="flex"
            alignItems="center"
          >
            <Icon as={FaArrowLeft} mr={2} />
            Back to Explore
          </Link>
        )}
        <Button
          leftIcon={hasCopied ? <BiCheck /> : <FaShareAlt />}
          colorScheme="whiteAlpha"
          variant="outline"
          onClick={handleShare}
        >
          {hasCopied ? "Copied!" : "Share Profile"}
        </Button>
      </Flex>
      <Center w={"full"}>
        <DLProfileCard />
      </Center>
    </Box>
  );
};

export default DLPreview;
