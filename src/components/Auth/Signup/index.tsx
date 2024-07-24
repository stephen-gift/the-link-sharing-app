"use client";
import {
  Box,
  VStack,
  Text,
  Link,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import DLInput from "@/components/global/TextField";
import DLButton from "@/components/global/Button";
import { Field, FieldProps, Form, Formik } from "formik";
import { createAccountSchema } from "@/utils/validation/signupSchema";
import { MdEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { account } from "@/app/appwrite";

interface CreateAccountFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const DLCreateAccountForm = () => {
  const initialValues: CreateAccountFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const toast = useToast();

  const handleSubmit = async (
    values: CreateAccountFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      console.log(values); // Remove or handle appropriately
      await account.create("unique()", values.email, values.password);

      const formattedValues = `
      Email: ${values.email}
      Password: ${values.password}
      Confirm Password: ${values.confirmPassword}
      `.trim();

      // Display success toast with values
      toast({
        title: "Account created.",
        description: `${formattedValues}. Your account has been successfully created.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to create account. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxWidth="700px" margin="auto" borderRadius="lg" p={6}>
      <VStack w={"full"} spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Create account
        </Text>
        <Text>Let’s get you started sharing your links!</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={createAccountSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ errors, touched, isValid, dirty, isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field }: FieldProps<string>) => (
                  <FormControl isInvalid={touched.email && !!errors.email}>
                    <DLInput
                      {...field}
                      icon={MdEmail}
                      label="Email address"
                      placeholder="e.g. alex@email.com"
                      type="email"
                      w={"full"}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field }: FieldProps<string>) => (
                  <FormControl
                    isInvalid={touched.password && !!errors.password}
                  >
                    <DLInput
                      {...field}
                      icon={BiLock}
                      label="Create password"
                      type="password"
                      placeholder="At least 8 characters"
                      w={"full"}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="confirmPassword">
                {({ field }: FieldProps<string>) => (
                  <FormControl
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  >
                    <DLInput
                      {...field}
                      icon={BiLock}
                      label="Confirm password"
                      type="password"
                      placeholder="At least 8 characters"
                      w={"full"}
                    />
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <DLButton
                type="submit"
                variant="primary"
                state={
                  !(isValid && dirty) || isSubmitting ? "disabled" : "default"
                }
                w="full"
              >
                {isSubmitting ? "Creating account..." : "Create new account"}
              </DLButton>
            </Form>
          )}
        </Formik>

        <Text textAlign="center">
          Already have an account?{" "}
          <Link color="purple.500" href="/auth/login">
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default DLCreateAccountForm;
