import { useState } from "react";
import { Flex, Box, FormControl, FormLabel, Input, FormErrorMessage, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Center } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Field } from "formik";
import { useAuthentication } from "../hooks";

function Form() {
    const [showPassword, setShowPassword] = useState(false);
    const [registrationError, setRegistrationError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState("");
    const { register } = useAuthentication();

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
            }}
            onSubmit={async (values, actions) => {
                const error = await register(values);

                if (error) {
                    setRegistrationError(error);
                } else {
                    actions.resetForm();
                    setRegistrationSuccess("Registration successful. You can now log in.");
                }

                actions.setSubmitting(false);
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        {registrationSuccess && (
                            <Center color="blue.500" mt={2}>
                                {registrationSuccess}
                            </Center>
                        )}
                        <Field
                            name="username"
                            validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Username is required";
                                } else if (value.length < 3) {
                                    error = "Username must contain at least 3 characters";
                                }
                                return error;
                            }}
                        >
                            {({ field }) => (
                                <FormControl id="username" isInvalid={errors.username && touched.username} isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input {...field} type="text" />
                                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field
                            name="email"
                            validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Email is required";
                                } else if (!/\S+@\S+\.\S+/.test(value)) {
                                    error = "Invalid email address";
                                }
                                return error;
                            }}
                        >
                            {({ field }) => (
                                <FormControl id="email" isInvalid={errors.email && touched.email} isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input {...field} type="email" />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" validate={(value) => (value.length < 6 ? "Password must contain at least 6 characters" : "")}>
                            {({ field }) => (
                                <FormControl id="password" isInvalid={errors.password && touched.password} isRequired>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup>
                                        <Input {...field} type={showPassword ? "text" : "password"} variant="filled" />
                                        <InputRightElement h={"full"}>
                                            <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        {registrationError && (
                            <Center color="red.500" mt={2}>
                                {registrationError}
                            </Center>
                        )}
                        <Stack spacing={10} pt={2}>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Register
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?&nbsp;
                                <Link color={"blue.400"} href={"/login"}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </form>
            )}
        </Formik>
    );
}

function Register() {
    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx={"auto"} minW={"md"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                    <Form />
                </Box>
            </Stack>
        </Flex>
    );
}

export default Register;
