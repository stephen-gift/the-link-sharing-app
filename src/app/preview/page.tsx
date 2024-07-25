"use client";
import DLPreviewContainer from "@/container/Profile/DLPreviewContainer";
import { Box } from "@chakra-ui/react";
import React from "react";

type Props = {};

const DLPreviewPage = (props: Props) => {
  return (
    <>
      <Box
        bg={"purple"}
        h={200}
        w={"full"}
        position={"absolute"}
        top={0}
        zIndex={-1}
        borderBottomRadius={20}
      ></Box>
      <DLPreviewContainer />
    </>
  );
};

export default DLPreviewPage;
