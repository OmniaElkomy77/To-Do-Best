import axios from 'axios';
import { Domain } from '../Constant';
import APIS from '../Api';

const GetAllAvatars = async () => {
    try {
        const response = await axios.get(Domain + APIS.all_avatar);
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const data = error.response.data;
            console.error(`Error ${status}:`, data);
            throw new Error(`Error on avatar: ${data.message || 'Unknown error'}`);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export default GetAllAvatars;
