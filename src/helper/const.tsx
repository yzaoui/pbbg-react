import React from "react";
import goldSrc from "../img/gold.png";

export const API_ROOT = process.env.NODE_ENV === "development" ? "http://localhost:8080" :
    process.env.NODE_ENV === "production" ? "https://pbbg-api.bitwiserain.com" : "";

export const USERNAME_REGEX = {
    pattern: "[A-Za-z0-9_]{1,15}",
    description: "Username must consist of 1-15 letters, numbers, and/or underscores"
};

export const PASSWORD_REGEX = {
    pattern: ".{6,}",
    description: "Password must consist of at least 6 characters"
};

export const goldImg = <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />;
