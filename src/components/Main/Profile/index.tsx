import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Divider,
  Flex,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import DLImageUpload from "@/components/global/ImageUpload";
import DLInput from "@/components/global/TextField";
import DLButton from "@/components/global/Button";
import { Field, Form, Formik, FormikProps } from "formik";
import { ProfileUpdateSchema } from "@/utils/validation/profileUpdateSchema";
import { Models } from "appwrite";
import { getUser, updatePrefs, updateUser } from "@/app/appwrite";
import { AppwriteUser } from "@/types/user";
import { useLinkStore } from "../../../../store";
import DLLoader from "@/components/global/Loader/DLLoader";

const DLProfileSection: React.FC = () => {
  const { user, setUser } = useLinkStore();
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUser();
  }, [toast]);

  if (!user) {
    return <DLLoader />;
  }

  return (
    <Box margin="auto" padding={6}>
      <Formik
        initialValues={{
          firstName: user?.name.split(" ")[0] || "",
          lastName: user?.name.split(" ")[1] || "",
          email: user?.email || "",
          picture: user.prefs?.picture || "",
        }}
        validationSchema={ProfileUpdateSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateUser(
              // values.email,
              values.firstName,
              values.lastName
              // "" // Add a way to collect the current password if needed for email updates
            );
            // Ensure picture is a valid string
            const updatedPrefs = {
              picture: values.picture || "",
            };

            await updatePrefs(updatedPrefs);

            // Display success toast
            toast({
              title: "Profile updated.",
              description: `Profile updated with the following details:
                \nFirst Name: ${values.firstName}
                \nLast Name: ${values.lastName}
                \nEmail: ${values.email}`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          } catch (error) {
            console.error("Failed to update profile:", error);
            toast({
              title: "Error",
              description: "Failed to update profile.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
        }: FormikProps<any>) => (
          <Form>
            <VStack spacing={6} align="stretch">
              <Heading size="lg">Profile Details</Heading>
              <Text fontSize="sm" color="gray.600">
                Add your details to create a personal touch to your profile.
              </Text>

              <FormControl>
                <DLImageUpload
                  defaultImage={user.prefs?.picture}
                  onImageUpload={(url: string) => setFieldValue("picture", url)}
                />
              </FormControl>

              <Field name="firstName">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.firstName && form.touched.firstName}
                  >
                    <DLInput
                      {...field}
                      label="First Name*"
                      labelPosition="side"
                      placeholder="e.g. John"
                      isInvalid={
                        form.errors.firstName && !!form.touched.firstName
                      }
                      error={form.errors.firstName}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="lastName">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.lastName && form.touched.lastName}
                  >
                    <DLInput
                      {...field}
                      label="Last Name*"
                      labelPosition="side"
                      placeholder="e.g. Appleseed"
                      isInvalid={
                        form.errors.lastName && !!form.touched.lastName
                      }
                      error={form.errors.lastName}
                    />
                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <DLInput
                      {...field}
                      label="Email"
                      labelPosition="side"
                      placeholder="e.g. email@example.com"
                      error={form.errors.email}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="picture">
                {({ field, form }: any) => (
                  <FormControl
                  // isInvalid={form.errors.picture && form.touched.picture}
                  >
                    <DLInput
                      {...field}
                      label="Picture URL"
                      labelPosition="side"
                      placeholder="e.g. https://example.com/picture.jpg"
                      error={form.errors.picture}
                      isReadOnly
                    />
                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
            <Divider />
            <Flex justifyContent="flex-end" alignItems="flex-end" py={2}>
              <DLButton
                variant="primary"
                state={isSubmitting ? "disabled" : "default"}
                type="submit"
              >
                Save
              </DLButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DLProfileSection;
