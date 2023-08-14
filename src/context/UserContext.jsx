import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const updateIsLogged = (newIsLogged) => {
        setIsLogged(newIsLogged);
        setIsLoading(false);
    };

    return <UserContext.Provider value={{ isLogged, isLoading, updateIsLogged }}>{children}</UserContext.Provider>;
}

export function useUserContext() {
    return useContext(UserContext);
}
