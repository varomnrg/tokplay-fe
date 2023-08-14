class UserAPI {
    static getUserData = async () => {
        try {
            let bearer = localStorage.getItem("bearer");
            if (!bearer) {
                throw new Error("No token saved");
            }
            const response = await fetch("https://varomnrg.xyz/tokplay/users/profile", {
                method: "GET",
                headers: { Authorization: bearer },
            });
            const data = await response.json();
            let user = data.data;
            return user;
        } catch (error) {
            localStorage.removeItem("bearer");
        }
    };
}

export default UserAPI;
