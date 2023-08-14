import { useState } from "react";
import { CommentAPI } from "../api";

export default function useSendMessage() {
    const [sending, setSending] = useState(false);

    async function sendMessage(videoId, message) {
        if (message.trim() === "") {
            return;
        }

        try {
            setSending(true);

            const response = await CommentAPI.createComment({ videoId, message });
            console.log(response);
            if (!response) {
                console.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSending(false);
        }
    }

    return { sendMessage, sending };
}
