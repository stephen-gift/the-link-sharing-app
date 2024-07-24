import { DLAuthLayout, DLLoginForm } from "@/components";
import React from "react";

type Props = {};

const DLLoginContainer = (props: Props) => {
  return (
    <DLAuthLayout>
      <DLLoginForm />
    </DLAuthLayout>
  );
};

export default DLLoginContainer;
