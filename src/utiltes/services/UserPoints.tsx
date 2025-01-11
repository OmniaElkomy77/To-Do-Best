import axios from 'axios';
import { Domain } from '../Constant';
import APIS from '../Api';

const get_userpoints = async (token: string) => {
    try {
        // console.log(`URL: ${Domain + APIS.user_points}`);
        const response = await axios.get(Domain + APIS.user_points, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // Check if error response is available
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const data = error.response.data;
            console.error(`Error ${status}:`, data);
            // Optionally, you can throw a custom error or message here
            throw new Error(`Failed to fetch user points: ${data.message || 'Unknown error'}`);
        } else {
            // Handle unexpected errors
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export default get_userpoints;
