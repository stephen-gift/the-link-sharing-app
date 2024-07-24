import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

interface DLButtonProps extends ButtonProps {
  variant: "primary" | "secondary";
  state: "default" | "active" | "disabled";
}

const DLButton: FC<DLButtonProps> = ({
  variant,
  state,
  children,
  ...props
}) => {
  const getButtonStyles = () => {
    const primaryStyles = {
      default: { bg: "primary.500", color: "white" },
      active: { bg: "primary.300", color: "white" },
      disabled: { bg: "primary.100", color: "white", opacity: 0.5 },
    };

    const secondaryStyles = {
      default: {
        bg: "white",
        color: "primary.500",
        border: "2px solid",
        borderColor: "primary.500",
      },
      active: {
        bg: "white",
        color: "primary.300",
        border: "2px solid",
        borderColor: "primary.300",
      },
      disabled: {
        bg: "white",
        color: "primary.100",
        border: "2px solid",
        borderColor: "primary.100",
        opacity: 0.5,
      },
    };

    if (variant === "primary") {
      return primaryStyles[state];
    } else if (variant === "secondary") {
      return secondaryStyles[state];
    }
  };

  const styles = getButtonStyles();

  return (
    <Button {...styles} {...props} isDisabled={state === "disabled"}>
      {children}
    </Button>
  );
};

export default DLButton;
