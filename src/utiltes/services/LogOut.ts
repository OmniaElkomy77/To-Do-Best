import axios from 'axios';
import { Domain } from "../Constant";
import { AppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/slices/userSlices';

const LogOut = async (token: string, url: string, Dispatch: AppDispatch) => {
    try {
        const response = await axios.get(Domain + url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });


        if (response.status === 200) {
            Dispatch(logoutUser());
            // console.log('Logout successful:', response.data);
        } else {
            // console.error('Logout failed:', response.data);
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.error('Error during logout:', error.response?.data);
        } else {
            // console.error('Unexpected error during logout:', error);
        }
        throw error; // Rethrow the error for further handling if needed
    }
};

export default LogOut;
