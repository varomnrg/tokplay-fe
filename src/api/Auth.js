class AuthAPI {
    static async login({ username, password }) {
        let error = "";
        const response = await fetch("https://varomnrg.xyz/tokplay/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("bearer", data.token);
        } else {
            error = "Wrong password or username";
            return error;
        }
    }

    static async register({ username, email, password }) {
        let error = "";
        const response = await fetch("https://varomnrg.xyz/tokplay/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (data.data) {
            return;
        } else {
            if (data.errors && data.errors.username) {
                error = "Username already exists";
            }
            if (data.errors && data.errors.email) {
                error = "Email already exists";
            }
        }
        return error;
    }
}

export default AuthAPI;
