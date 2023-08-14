import { Box, Avatar, Text } from "@chakra-ui/react";

function ChatBubble({ username, message, avatarUrl }) {
    return (
        <Box display="flex" alignItems="center" mb={2}>
            <Avatar size="sm" src={avatarUrl} alt={username} mr={2} />
            <Text color="white">
                <strong>{username}:</strong> {message}
            </Text>
        </Box>
    );
}

export default ChatBubble;
