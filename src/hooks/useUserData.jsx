import { useEffect, useState } from "react";
import { UserAPI } from "../api";

function useUserData() {
    const [users, setUsers] = useState();
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        async function fetchUserData() {
            try {
                const user = await UserAPI.getUserData();
                if (!user) {
                    throw new Error("Error fetching user data");
                }
                setUsers(user);
                setUserLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserLoading(false);
            }
        }

        fetchUserData();
    }, []);

    return { users, userLoading };
}

export default useUserData;
