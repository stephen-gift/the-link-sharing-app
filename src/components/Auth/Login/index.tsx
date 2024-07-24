"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import DLInput from "@/components/global/TextField";
import DLButton from "@/components/global/Button";
import { Field, FieldProps, Form, Formik } from "formik";
import { loginSchema } from "@/utils/validation/loginSchema";
import { MdEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { account } from "@/app/appwrite";

const DLLoginForm = () => {
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (
    values: { email: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await account.createEmailPasswordSession(values.email, values.password);
      toast({
        title: "Login successful.",
        description: "You have been successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/profile");
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description:
          "Login failed. Please check your credentials and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxWidth="700px" margin="auto" borderRadius="lg">
      <VStack w={"full"} spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Login
        </Text>
        <Text>Add your details below to get back into the app</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values, setSubmitting);
          }}
        >
          {({ errors, touched, isValid, dirty,isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field }: FieldProps<string>) => (
                  <DLInput
                    {...field}
                    icon={MdEmail}
                    label="Email address"
                    placeholder="e.g. alex@email.com"
                    type="email"
                    w={"full"}
                    isInvalid={touched.email && !!errors.email}
                    error={errors.email}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field }: FieldProps<string>) => (
                  <DLInput
                    {...field}
                    icon={BiLock}
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    w={"full"}
                    isInvalid={touched.password && !!errors.password}
                    error={errors.password}
                  />
                )}
              </Field>

              <DLButton
                type="submit"
                variant="primary"
                state={!(isValid && dirty) ? "disabled" : "default"}
                w={"full"}
                isDisabled={!(isValid && dirty)}
              >
                 {isSubmitting ? "Logging In..." : "Login"}
              </DLButton>
            </Form>
          )}
        </Formik>

        <Text textAlign="center">
          Don’t have an account?
          <Link color="purple.500" href="/auth/signup">
            Create account
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default DLLoginForm;
