import {
  VStack,
  Button,
  Box,
  Icon,
  ButtonProps,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitch,
} from "react-icons/fa";
import {
  SiDevdotto,
  SiCodewars,
  SiFreecodecamp,
  SiGitlab,
  SiHashnode,
  SiStackoverflow,
} from "react-icons/si";
import { IconType } from "react-icons";

// Mapping for icons and background colors based on label
const iconMap: Record<string, IconType> = {
  GitHub: FaGithub,
  "Frontend Mentor": SiDevdotto,
  Twitter: FaTwitter,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
  Facebook: FaFacebook,
  Twitch: FaTwitch,
  Devto: SiDevdotto,
  Codewars: SiCodewars,
  freeCodeCamp: SiFreecodecamp,
  GitLab: SiGitlab,
  Hashnode: SiHashnode,
  "Stack Overflow": SiStackoverflow,
};

const bgMap: Record<string, string> = {
  GitHub: "gray.700",
  "Frontend Mentor": "blue.400",
  Twitter: "twitter.500",
  LinkedIn: "linkedin.500",
  YouTube: "red.500",
  Facebook: "facebook.500",
  Twitch: "purple.500",
  Devto: "gray.700",
  Codewars: "red.600",
  freeCodeCamp: "indigo.600",
  GitLab: "orange.500",
  Hashnode: "blue.500",
  "Stack Overflow": "orange.400",
};

interface SocialLinkProps extends ButtonProps {
  label: string;
  url: string;
}

const DLPreviewButton = ({ label, url, ...buttonProps }: SocialLinkProps) => {
  const { onCopy } = useClipboard(url);
  const toast = useToast();

  // Retrieve icon, background color, and URL based on the label
  const icon = iconMap[label];
  const bg = bgMap[label];

  if (!icon || !bg) {
    return null; // or return a fallback UI if desired
  }

  const handleClick = () => {
    onCopy();
    toast({
      title: "URL copied!",
      description: "The URL has been copied to your clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Button
      onClick={handleClick}
      leftIcon={<Icon as={icon} />}
      rightIcon={<Box>&gt;</Box>}
      justifyContent="space-between"
      width="full"
      bg={bg}
      color="white"
      _hover={{ opacity: 0.8 }}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default DLPreviewButton;
