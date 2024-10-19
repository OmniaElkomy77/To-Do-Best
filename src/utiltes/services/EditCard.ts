import axios from "axios";
import { Domain } from "../Constant";
import APIS from "../Api";
import { ICardData } from "../Type/Component";

const url = APIS.edit_card;

const Edit_card = async (token: string, updateCard: ICardData) => {
    try {
        const response = await axios.post(Domain + url, updateCard, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        // Check if error response exists
        if (error.response) {
            // Server responded with a status other than 2xx
            const statusCode = error.response.status;
            const errorMessage = error.response.data?.message || "An error occurred while editing the card.";

            if (statusCode === 400) {
                console.error("Validation error:", errorMessage);
                throw new Error(`Validation Error: ${errorMessage}`);
            } else if (statusCode === 401) {
                console.error("Unauthorized error:", errorMessage);
                throw new Error("Unauthorized: Please check your credentials.");
            } else if (statusCode === 404) {
                console.error("Not found error:", errorMessage);
                throw new Error("Not Found: The card you are trying to edit does not exist.");
            } else if (statusCode === 500) {
                console.error("Server error:", errorMessage);
                throw new Error("Server Error: An internal server error occurred. Please try again later.");
            } else {
                console.error(`Error ${statusCode}:`, errorMessage);
                throw new Error(`Error ${statusCode}: ${errorMessage}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received:", error.message);
            throw new Error("Network Error: No response from the server. Please check your internet connection.");
        } else {
            // Something else happened while setting up the request
            console.error("Error setting up request:", error.message);
            throw new Error("Unexpected Error: An error occurred while trying to edit the card.");
        }
    }
};

export default Edit_card;
