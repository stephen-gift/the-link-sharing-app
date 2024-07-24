import { DLAuthLayout, DLCreateAccountForm } from "@/components";
import React from "react";

type Props = {};

const DLSignupContainer = (props: Props) => {
  return (
    <DLAuthLayout>
      <DLCreateAccountForm />
    </DLAuthLayout>
  );
};

export default DLSignupContainer;
