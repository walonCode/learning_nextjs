import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
        const encodedToken = req.cookies.get("user")?.value || "";
        if (!encodedToken) {
            throw new Error("No token found");
        }

        const decodedToken = jwt.verify(encodedToken, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;

        console.log("Decoded Token:", decodedToken);

        if (!decodedToken.id) {
            throw new Error("User ID not found in token");
        }

        return decodedToken.id; // Extract user ID
    } catch (error) {
        throw new Error(`Error occurred: ${error}`);
    }
};
