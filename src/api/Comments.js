class CommentAPI {
    static async getCommentsByVideoId(videoId) {
        const response = await fetch(`https://varomnrg.xyz/tokplay/comments/list/${videoId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        let comments = data.data;
        return comments;
    }

    static async createComment({ videoId, message }) {
        const bearer = localStorage.getItem("bearer");
        let response;
        if (bearer) {
            response = await fetch(`https://varomnrg.xyz/tokplay/comments/${videoId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: bearer },
                body: JSON.stringify({
                    comment: message,
                }),
            });
        } else {
            response = await fetch(`https://varomnrg.xyz/tokplay/comments/${videoId}/guest`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    comment: message,
                }),
            });
        }

        const data = await response.json();
        if (data.data) {
            return true;
        }
        return false;
    }
}

export default CommentAPI;
