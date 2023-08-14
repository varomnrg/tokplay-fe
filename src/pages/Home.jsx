import React, { useState } from "react";
import { Spinner, Box, Text, Flex, Avatar, Tag, HStack, Center, Image, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Input, useColorModeValue, Stack } from "@chakra-ui/react";
import { NavbarSearch, ThumbnailCard } from "../components";
import { useUserData, useGetVideos } from "../hooks";
import { useEffect } from "react";

function Home() {
    const { videos, videoLoading, searchVideos, tagList } = useGetVideos();
    const { users, userLoading } = useUserData();
    const [searchQuery, setSearchQuery] = useState("");
    const [tags, setTags] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(true);
        searchVideos(searchQuery, tags);
        setRefresh(false);
    }, [searchQuery, tags]);

    if (userLoading || videoLoading) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Flex>
        );
    }

    const handleSearchSubmit = (event, query) => {
        event.preventDefault();
        setSearchQuery(query);
    };

    const handleTagClick = (tag) => {
        if (tags === tag) {
            setTags("");
        } else {
            setTags(tag);
        }
    };

    return (
        <>
            <NavbarSearch users={users} onSearchSubmit={handleSearchSubmit} />
            <Box bg={"rgb(36, 36, 36)"} px={4}>
                <Flex h={8} alignItems={"center"} justifyContent={"center"}>
                    <HStack spacing={4} alignItems={"center"} justifyContent={"center"}>
                        {tagList.map((tag, index) => (
                            <Tag
                                p={2}
                                key={index}
                                cursor={"pointer"}
                                onClick={() => {
                                    handleTagClick(tag);
                                }}
                                _hover={{ bg: "blue.500", color: "white" }}
                                bg={tags === tag ? "blue.500" : "white"}
                                color={tags === tag ? "white" : "gray.700"}
                                transition="background-color 0.2s, color 0.2s"
                            >
                                {tag.toUpperCase()}
                            </Tag>
                        ))}
                    </HStack>
                </Flex>
            </Box>
            {refresh ? (
                <Flex justify="center" align="center" h="100vh">
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                </Flex>
            ) : (
                <Box flex="1" p={4} bg={"rgb(36, 36, 36)"} minH="100%">
                    <Flex wrap="wrap" w="100%">
                        {videos.map((video) => (
                            <ThumbnailCard key={video.videoId} videoId={video.videoId} title={video.title} channel={video.channel} tags={video.tags} thumbnailUrl={video.thumbnailUrl} />
                        ))}
                    </Flex>
                </Box>
            )}
        </>
    );
}

export default Home;
