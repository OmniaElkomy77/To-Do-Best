import axios from 'axios';
import { Domain } from './Constant';
import Toast from 'react-native-toast-message';

interface ApiResponse {
    data: {
        email: string;
        token: string;
    };
    token: string;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
            errors?: { [key: string]: string };
        };
    };
    message?: string;
}

export const postApi = async (
    url: string,
    data: object,
    setLoading: (loading: boolean) => void,
    onSuccess: (email: string, token: string) => void,
    stopTimer: () => void // New callback to stop the timer
) => {
    setLoading(true);

    try {
        const res = await axios.post<ApiResponse>(Domain + url, data);

        if (res.status === 200 && res.data) {
            onSuccess(res.data.data.email, res.data.token);
            stopTimer(); // Stop the timer if OTP is correct
            Toast.show({
                type: 'success',
                text1: 'Success',
                position: 'bottom',
                visibilityTime: 1000,
                bottomOffset: 20,
            });
        }
    } catch (error) {
        const err = error as ApiError;

        if (err.response && err.response.data) {
            const { data } = err.response;

            if (data.errors) {
                Object.keys(data.errors ?? {}).forEach((field) => {
                    Toast.show({
                        type: 'error',
                        text1: `${field.charAt(0).toUpperCase() + field.slice(1)} Error`,
                        text2: data.errors?.[field] || 'Error',
                        position: 'bottom',
                        visibilityTime: 3000,
                        bottomOffset: 20,
                    });
                });
            } else if (data.message) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: data.message,
                    position: 'bottom',
                    visibilityTime: 3000,
                    bottomOffset: 20,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'An unknown error occurred.',
                    position: 'bottom',
                    visibilityTime: 3000,
                    bottomOffset: 20,
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.message || 'Network error or server is down.',
                position: 'bottom',
                visibilityTime: 3000,
                bottomOffset: 20,
            });
        }
    } finally {
        setLoading(false);
    }
};
