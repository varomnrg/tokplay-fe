import React from "react";
import { Flex, Image, Stack, Tag, Text, HStack, Box } from "@chakra-ui/react";

function ThumbnailCard({ videoId, title, channel, tags, thumbnailUrl }) {
    return (
        <Flex
            maxW="25%"
            minW="25%"
            overflow="hidden"
            position="relative"
            p="2"
            id={videoId}
            height="250px"
            minH="250px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            transition="transform 0.2s ease-in-out"
            _hover={{
                transform: "scale(1.04)",
            }}
            onClick={(e) => {
                window.location.href = `/play/video/${videoId}`;
            }}
        >
            <Image borderWidth="1px" borderRadius="lg" src={thumbnailUrl} alt={title} objectFit="cover" maxW="100%" minW="100%" maxHeight="100%" minHeight="100%"></Image>
            <Box borderRadius="lg" position="absolute" w={"96%"} h={"96%"} bg={"black"} opacity="0.3" />

            <HStack position="absolute" left="5" top="5" spacing="1" color="white">
                {tags.map((tag, index) => (
                    <Tag p={2} key={index}>
                        {tag.toUpperCase()}
                    </Tag>
                ))}
            </HStack>

            <Stack position="absolute" left="5" bottom="5" spacing="1" color="white" w={"90%"}>
                <Text fontSize="lg" fontWeight="semibold">
                    {title}
                </Text>
                <Text fontSize="sm">{channel}</Text>
            </Stack>
        </Flex>
    );
}

export default ThumbnailCard;
