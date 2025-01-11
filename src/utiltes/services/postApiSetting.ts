import axios from 'axios';
import { Domain } from "../Constant";
import { Alert } from 'react-native';

const postApiSetting = async (token: string, url: string, data: any, setLoading: any) => {
    setLoading(true);
    try {
        const response = await axios.post(Domain + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        Alert.alert("Updated data", "You update data successfuly")
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error during update data:', error.response?.data);

        } else {
            console.error('Unexpected error during update data:', error);
        }
        throw error;
    } finally {
        setLoading(false);
    }
};

export default postApiSetting;
