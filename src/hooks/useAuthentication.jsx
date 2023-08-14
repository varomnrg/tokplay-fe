import { useUserContext } from "../context/UserContext";
import { AuthAPI } from "../api";

function useAuthentication() {
    const { updateIsLogged } = useUserContext();

    async function login({ username, password }) {
        try {
            const error = await AuthAPI.login({ username, password });
            console.log(error);
            if (error) {
                return error;
            } else {
                updateIsLogged(true);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    async function register({ username, email, password }) {
        try {
            const error = await AuthAPI.register({ username, email, password });
            if (error) {
                return error;
            } else {
                login({ username, password });
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }

    function logout() {
        localStorage.removeItem("bearer");
        updateIsLogged(false);
    }

    return { login, register, logout };
}

export default useAuthentication;
