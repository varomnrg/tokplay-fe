class VideoAPI {
    static async getAllVideos(query = "", tags = "") {
        const response = await fetch(`https://varomnrg.xyz/tokplay/videos/thumbnail?q=${query}&tags=${tags}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.data;
    }

    static async getAllTags() {
        const response = await fetch(`https://varomnrg.xyz/tokplay/videos/tags`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.data;
    }
}

export default VideoAPI;
