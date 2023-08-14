import { Box, Text, Flex, Avatar, Link, LinkBox, LinkOverlay, HStack, Center, Image, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Input, useColorModeValue, Stack } from "@chakra-ui/react";
import { useAuthentication } from "../hooks";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function NavbarSearch({ users, onSearchSubmit }) {
    const { logout } = useAuthentication();
    const [searchQuery, setSearchQuery] = useState("");
    const history = useHistory();

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearchSubmit(event, searchQuery);
    };

    const handleLogout = () => {
        logout();
        history.go(0);
    };

    if (!users) {
        users = {
            username: "Guest",
        };
    }

    return (
        <>
            <Box bg={"rgb(36, 36, 36)"} px={4}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <LinkBox>
                        <LinkOverlay href="/play/">
                            <HStack spacing={0.5} alignItems={"center"} justifyContent={"center"}>
                                <Flex alignItems={"center"} pt={"2px"} h={"40px"}>
                                    <Image src="/play/logo.png" height={"25px"} alt="Tokopedia" />
                                </Flex>
                                <Flex alignItems={"start"} h={"40px"}>
                                    <Text fontSize={"2xl"} color={"white"}>
                                        play
                                    </Text>
                                </Flex>
                            </HStack>
                        </LinkOverlay>
                    </LinkBox>
                    <Box mr={125} w={"50%"}>
                        <form onSubmit={handleSearchSubmit}>
                            <Input placeholder="Find a video title" bg="gray.200" color="gray.800" onChange={handleSearchQueryChange} />
                        </form>
                    </Box>

                    <Flex alignItems={"center"}>
                        <Menu>
                            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                                <Avatar size={"md"} bg="white" border={"1px solid black"} src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${users.username}`} />
                            </MenuButton>
                            {users.username !== "Guest" ? (
                                <MenuList alignItems={"center"}>
                                    <br />
                                    <Center>
                                        <Avatar size={"xl"} bg="white" border={"1px solid black"} src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${users.username}`} />
                                    </Center>
                                    <br />
                                    <Center>
                                        <Box>{users.username}</Box>
                                    </Center>
                                    <Center>
                                        <Box>{users.email}</Box>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            ) : (
                                <MenuList>
                                    <br />
                                    <Center>
                                        <Text>Logged in as Guest</Text>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>
                                        <Link href="/play/login">
                                            <Center>Login</Center>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href="/play/register">
                                            <Center>Register</Center>
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            )}
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export default NavbarSearch;
