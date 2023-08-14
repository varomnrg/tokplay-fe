import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Center, Flex, Textarea, Spinner, Input } from "@chakra-ui/react";
import { ChatBubble } from "./";
import { io } from "socket.io-client";
import { useGetComments, useSendMessage } from "../hooks";

function Chatbox({ videoId, users }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const { comments, commentsLoading } = useGetComments({ videoId });
    const { sendMessage } = useSendMessage();

    useEffect(() => {
        const socket = io("https://varomnrg.xyz");

        socket.emit("join_room", videoId);

        socket.on("chat_message", (message) => {
            addMessageToChat(message);
        });

        return () => {
            socket.disconnect();
        };
    }, [videoId]);

    useEffect(() => {
        if (!commentsLoading && comments) {
            setMessages(comments);
        }
    }, [commentsLoading, comments]);

    const addMessageToChat = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        sendMessage(videoId, inputMessage);
        setInputMessage("");
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    if (commentsLoading)
        return (
            <Flex justify="center" align="center" h="100%">
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Flex>
        );

    return (
        <Flex direction="column" width="380px" mx={3} height="100%" bg={"#333333"} borderRadius="md" boxShadow="md" p={4}>
            <Center h="4%" mb={2}>
                <Text fontSize="xl" color="white">
                    Chat
                </Text>
            </Center>
            <VStack h="75%" flex="1" spacing={2} align="stretch" overflowY="auto">
                <Box p={2}>
                    {messages.map((message, index) => {
                        return <ChatBubble key={index} username={message.username} message={message.comment} avatarUrl={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${message.username}`} />;
                    })}
                </Box>
            </VStack>
            <Box h="12%" mt={2}>
                <form onSubmit={handleSendMessage}>
                    <Input h="50px" size="sm" placeholder="Type your message..." resize="none" border="1px" borderColor="gray" variant="filled" bg="#333339" color="white" _placeholder={{ color: "gray.400" }} value={inputMessage} onChange={handleInputChange} />
                </form>
            </Box>
        </Flex>
    );
}

export default Chatbox;
