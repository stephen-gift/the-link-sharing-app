"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import DLPreviewPage from "@/app/preview/page";

function BasketInterception() {
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
    onClose: () => router.back(),
  });
  const toast = useToast();

  useEffect(() => {
    toast({
      title: "Intercepting Route",
      description: "Refresh to see the magic!",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  }, [toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent className="h-4/5 w-full overflow-y-auto ">
        {/* <ModalHeader>Basket</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
          <DLPreviewPage />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BasketInterception;
