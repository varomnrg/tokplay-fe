import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Auth, Home, VideoDetail } from "./pages";
import { useUserContext } from "./context/UserContext";
import { Spinner, Flex } from "@chakra-ui/react";
import { useUserData } from "./hooks";
import { useEffect } from "react";

function App() {
    const { isLogged, isLoading, updateIsLogged } = useUserContext();

    const { users, userLoading } = useUserData();

    useEffect(() => {
        if (users) {
            updateIsLogged(true);
        } else {
            updateIsLogged(false);
        }
    }, [users]);

    return (
        <Router>
            {isLoading || userLoading ? (
                <Flex justify="center" align="center" h="100vh">
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                </Flex>
            ) : (
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/video/:videoId" component={VideoDetail} />
                    <Route path="/login">
                        <Auth type="login" />
                    </Route>
                    <Route path="/register">
                        <Auth type="register" />
                    </Route>
                </Switch>
            )}
        </Router>
    );
}

export default App;

