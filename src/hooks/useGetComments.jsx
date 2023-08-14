import { CommentAPI } from "../api";
import { useState, useEffect } from "react";

function useGetComments({ videoId }) {
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments(videoId) {
            try {
                setCommentsLoading(true);
                const fetchedComments = await CommentAPI.getCommentsByVideoId(videoId);
                setComments(fetchedComments);
                setCommentsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchComments(videoId);
    }, []);

    return { comments, commentsLoading };
}

export default useGetComments;
