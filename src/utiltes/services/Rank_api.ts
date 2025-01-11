import axios from 'axios';
import { Domain } from "../Constant";

const Rank_api = async (token: string, url: string) => {
    try {
        const response = await axios.get(Domain + url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(token)
        if (response.status === 200) {
            // console.log('successful:', response.data.data);
            // console.log(response.data.media)
            return response.data; // Return the data here
        } else {
            console.error('Failed:', response.data);
            return "error";
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
};

export default Rank_api;
