"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Divider,
  Flex,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import DLButton from "@/components/global/Button";
import { useCallback, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import DLDropdown from "@/components/global/DropDown";
import { FiDelete } from "react-icons/fi";
import DLInput from "@/components/global/TextField";
import { MdLink } from "react-icons/md";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import {
  createDocument,
  deleteDocument,
  listDocuments,
  updateDocument,
} from "@/app/appwrite";
import { Link, LinkResponse } from "@/types/user";
import { useLinkStore } from "../../../../store";
import { FaEquals } from "react-icons/fa";

const DLLinkSection: React.FC = () => {
  const toast = useToast();

  const { links, setLinks } = useLinkStore(); // Use Zustand store

  // const [links, setLinks] = useState<Link[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const socialOptions = [
    "GitHub",
    "Frontend Mentor",
    "Twitter",
    "LinkedIn",
    "YouTube",
    "Facebook",
    "Twitch",
    "Dev.to",
    "Codewars",
    "Codepen",
    "freeCodeCamp",
    "GitLab",
    "Hashnode",
    "Stack Overflow",
  ];

  const initialValues = {
    links: [] as Link[],
  };

  const validationSchema = Yup.object().shape({
    links: Yup.array().of(
      Yup.object().shape({
        platform: Yup.string().required("Platform is required"),
        url: Yup.string().url("Invalid URL").required("URL is required"),
      })
    ),
  });

  const fetchLinks = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedLinks = await listDocuments<Link>();
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Error listing documents:", error);
      toast({
        title: "Error fetching links.",
        description: "An error occurred while fetching your links.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleSubmit = async (
    values: { links: Link[] },
    { setSubmitting }: FormikHelpers<{ links: Link[] }>
  ) => {
    try {
      setSubmitting(true);
      const updatedLinks: Link[] = [];

      // Process all links
      for (const link of values.links) {
        if (link.$id) {
          // Update existing link
          const updatedLink = await updateDocument<Link>(link.$id, {
            platform: link.platform,
            url: link.url,
          });
          updatedLinks.push(updatedLink);
        } else {
          // Create new link
          // Ensure required fields are provided and check if 'id' should be auto-generated or not
          const newLink = await createDocument<Link>({
            platform: link.platform,
            url: link.url,
          });
          updatedLinks.push(newLink);
        }
      }

      // Delete links that were removed
      const updatedLinkIds = new Set(updatedLinks.map((link) => link.$id));
      for (const link of links) {
        if (link.$id && !updatedLinkIds.has(link.$id)) {
          await deleteDocument(link.$id);
        }
      }

      setLinks(updatedLinks);
      toast({
        title: "Links saved.",
        description: "Your links have been saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error saving links:", error); // Log the error to understand the issue
      toast({
        title: "Error saving links.",
        description: "An error occurred while saving your links.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <VStack p={4} w={"full"}>
      <Box p={4} w={"full"}>
        <Heading as="h1" size="lg" mb={4}>
          Customize your links
        </Heading>
        <Text fontSize="sm" mb={4}>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </Text>

        <Formik
          initialValues={{ links }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <DLButton
                leftIcon={<BiPlus />}
                variant="secondary"
                state="default"
                w="full"
                mb={8}
                onClick={() => {
                  setFieldValue("links", [
                    { platform: "", url: "" }, // Add new link at the start
                    ...values.links,
                  ]);
                }}
              >
                Add new link
              </DLButton>

              {isLoading ? (
                <Text>Loading...</Text>
              ) : values.links.length === 0 ? (
                <VStack
                  spacing={4}
                  align="center"
                  bg="light.50"
                  p={8}
                  borderRadius="md"
                >
                  <Image
                    src="/images/GetStarted.svg"
                    alt="Phone icon"
                    boxSize="200px"
                  />
                  <Heading colorScheme="yellow" size="lg">
                    Lets get you started
                  </Heading>
                  <Text textAlign="center" fontSize="sm" color="gray.600">
                    Use the Add new link button to get started. Once you have
                    more than one link, you can reorder and edit them. We are
                    here to help you share your profiles with everyone!
                  </Text>
                </VStack>
              ) : (
                <FieldArray name="links">
                  {({ remove, push }) => (
                    <VStack spacing={4} align="stretch">
                      {values.links.map((link, index) => (
                        <Box
                          key={index}
                          borderWidth={1}
                          borderRadius="md"
                          p={4}
                        >
                          <HStack justifyContent="space-between" mb={2}>
                            <Text
                              display="flex"
                              gap={1}
                              justifyContent={"center"}
                              alignItems={"center"}
                              fontWeight="bold"
                            >
                              <FaEquals />
                              Link #{index + 1}
                            </Text>

                            <Text
                              cursor={"pointer"}
                              onClick={() => remove(index)}
                              color={"#737373"}
                            >
                              Remove
                            </Text>
                          </HStack>
                          <VStack align="stretch">
                            <Field name={`links.${index}.platform`}>
                              {({ field }: any) => (
                                <DLDropdown
                                  placeholder="Select platform"
                                  options={socialOptions}
                                  value={field.value}
                                  onChange={(selectedOption) =>
                                    setFieldValue(field.name, selectedOption)
                                  }
                                />
                              )}
                            </Field>
                            <Field name={`links.${index}.url`}>
                              {({ field, form }: any) => (
                                <DLInput
                                  {...field}
                                  placeholder="e.g. https://www.github.com/johnappleseed"
                                  icon={MdLink}
                                  label="Link"
                                  error={
                                    form.touched.links?.[index]?.url &&
                                    form.errors.links?.[index]?.url
                                  }
                                />
                              )}
                            </Field>
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  )}
                </FieldArray>
              )}

              <Divider />
              <Flex justifyContent="flex-end" alignItems="flex-end" py={3}>
                <DLButton
                  variant="primary"
                  state="default"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Save
                </DLButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </VStack>
  );
};

export default DLLinkSection;
