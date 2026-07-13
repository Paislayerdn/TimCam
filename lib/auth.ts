export function authenticate(
    username: string,
    password: string
) {
    return (
        username === "wongsathon" &&
        password === "youwouldntknowthispassword"
    );
}