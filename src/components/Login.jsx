import { useState } from "react";
import { Flex, Box, FormControl, FormLabel, Input, FormErrorMessage, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Center } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Field } from "formik";
import { useAuthentication } from "../hooks";
import { useHistory } from "react-router-dom";

function Form() {
    const [showPassword, setShowPassword] = useState(false);
    const [registrationError, setRegistrationError] = useState("");
    const { login } = useAuthentication();
    const history = useHistory();

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
            }}
            onSubmit={async (values, actions) => {
                const error = await login(values);
                if (error) {
                    setRegistrationError(error);
                } else {
                    actions.resetForm();
                    history.push("/play/");
                }

                actions.setSubmitting(false);
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Field name="username">
                            {({ field }) => (
                                <FormControl id="username" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input {...field} type="text" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field }) => (
                                <FormControl id="password" isRequired>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup>
                                        <Input {...field} type={showPassword ? "text" : "password"} variant="filled" />
                                        <InputRightElement h={"full"}>
                                            <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
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
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Create an account?&nbsp;
                                <Link color={"blue.400"} href={"/play/register"}>
                                    Register
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </form>
            )}
        </Formik>
    );
}

function Login() {
    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx={"auto"} minW={"md"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign in
                    </Heading>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                    <Form />
                </Box>
            </Stack>
        </Flex>
    );
}

export default Login;
