import { useState, useEffect } from "react";
import { VideoAPI } from "../api";

function useGetVideos() {
    const [videos, setVideos] = useState([]);
    const [videoLoading, setVideoLoading] = useState(true);
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        async function fetchVideoThumbnails() {
            try {
                const fetchedVideos = await VideoAPI.getAllVideos();
                setVideos(fetchedVideos);
                setVideoLoading(false);
            } catch (error) {
                console.error(error);
                setVideoLoading(false);
            }
        }

        async function fetchVideoTags() {
            try {
                const fetchedTags = await VideoAPI.getAllTags();
                setTagList(fetchedTags);
            } catch (error) {
                console.error(error);
            }
        }
        fetchVideoTags();
        fetchVideoThumbnails();
    }, []);

    const searchVideos = async (query, tags) => {
        setVideoLoading(true);
        try {
            const fetchedVideos = await VideoAPI.getAllVideos(query, tags);
            setVideos(fetchedVideos);
            setVideoLoading(false);
        } catch (error) {
            console.error(error);
            setVideoLoading(false);
        }
    };

    return { videos, videoLoading, tagList, searchVideos };
}

export default useGetVideos;
