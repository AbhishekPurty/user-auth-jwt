import jwt from "jsonwebtoken";

export default function VerifyToken(token) {
    const SECRET_KEY = process.env.SECRET_KEY;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("token in the component", decoded)
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null; // Or throw an error, depending on your application's needs
    }
}
