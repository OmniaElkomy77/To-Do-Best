import axios from 'axios';
import { Domain } from '../Constant';
import APIS from '../Api';

const GetMyAvatar = async (token: string, id: string) => {

    try {
        const response = await axios.get(`${Domain + APIS.get_my_avatar}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        // Check if error response is available

        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const data = error.response.data;
            console.error(`Error ${status}:`, data);
            // Optionally, you can throw a custom error or message here
            throw new Error(`Failed to fetch avatar: ${data.message || 'Unknown error'}`);
        } else {
            // Handle unexpected errors
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export default GetMyAvatar;
