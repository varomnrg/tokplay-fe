import React from "react";
import { Login, Register } from "../components/";

function Auth({ type = "login" }) {
    return <>{type === "login" ? <Login /> : <Register />}</>;
}

export default Auth;
