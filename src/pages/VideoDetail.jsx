import React from "react";
import ReactPlayer from "react-player/youtube";
import { Navbar, Chatbox, ProductCard } from "../components";
import { useUserData } from "../hooks";
import { Box, Flex, VStack, Spinner, Center } from "@chakra-ui/react";
import { useGetProducts } from "../hooks";

function VideoDetail(props) {
    const videoId = props.match.params.videoId;
    const { users, userLoading } = useUserData();
    const { products, productsLoading } = useGetProducts({ videoId });

    if (userLoading || productsLoading) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Flex>
        );
    }

    return (
        <>
            <Navbar users={users} />
            <Box bg={"rgb(36, 36, 36)"} h="90vh">
                <Flex direction="row" h="100%" w="100%" justifyContent={"center"}>
                    <VStack
                        flex={1}
                        overflowY="scroll"
                        color="white"
                        h="100%"
                        w="100%"
                        spacing="3"
                        alignItems="center"
                        justifyContent="flex-start"
                        mx={3}
                        style={{ overflow: "scroll", scrollbarWidth: "none" }}
                        css={{
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    >
                        {products ? (
                            products.map((product, index) => <ProductCard key={index} products={product} />)
                        ) : (
                            <>
                                <Center h="100%" w="100%">
                                    <h1>No Products</h1>
                                </Center>
                            </>
                        )}
                    </VStack>
                    <Box flex={6} h="100%" w="100%" bg="rgb(36, 36, 36)">
                        <Center h="100%" w="100%">
                            <ReactPlayer height="100%" width="100%" controls={true} playing={true} url={"https://www.youtube.com/watch?v=" + videoId} />
                        </Center>
                    </Box>

                    <Chatbox videoId={videoId} users={users} />
                </Flex>
            </Box>
        </>
    );
}

export default VideoDetail;
