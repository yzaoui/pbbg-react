export const USERNAME_REGEX = {
    pattern: "[A-Za-z0-9_]{1,15}",
    description: "Username must consist of 1-15 letters, numbers, and/or underscores"
};

export const PASSWORD_REGEX = {
    pattern: ".{6,}",
    description: "Password must consist of at least 6 characters"
};
