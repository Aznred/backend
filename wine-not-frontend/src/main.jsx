import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const CLIENT_ID = "TON_CLIENT_ID.apps.googleusercontent.com"; // Remplace par le tien

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={"341114379232-2lbs9hdca4onrhdtp4t4fmgt36aq69ji.apps.googleusercontent.com"}>
        <App />
    </GoogleOAuthProvider>
);
