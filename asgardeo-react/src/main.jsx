import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@asgardeo/auth-react";
import App from "./App.jsx";
import "./index.css";

// Your SafePath Asgardeo Configuration
const authConfig = {
    signInRedirectURL: "http://localhost:5173",
    signOutRedirectURL: "http://localhost:5173",
    clientID: "qqEpnkv051QgwstfZa0SJOJnhMAa", // Your Client ID
    baseUrl: "https://api.asgardeo.io/t/safepath", // Your Base URL
    scope: [ "openid", "profile", "groups" ] // IMPORTANT: 'groups' is needed to get user roles
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider config={authConfig}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);