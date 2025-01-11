// Import necessary dependencies
import axios from 'axios';
import { Domain } from "../utiltes/Constant";
import Toast from 'react-native-toast-message';
import { signinUser } from '../redux/slices/userSlices';
import { AppDispatch } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the expected structure of the API response
interface ApiResponse {
    data: {
        email: string;
        username: string;
        token: string;
    };
    token: string;
    media: {
        avatar_id: number;
        category_id: string;
        link: string;
        type: string;
    };
}

// Define the expected structure of an error response
interface ApiError {
    response?: {
        data?: {
            message?: string;
            errors?: { [key: string]: string };
        };
    };
    message?: string;
}

// Main function to make API post request and handle Redux actions
export const Api_post_redux = async (
    dispatch: AppDispatch,
    url: string,
    data: object,
    setLoading: (loading: boolean) => void,
    onSuccess: (email: string, token: string) => void,
    stopTimer: () => void // Callback to stop the timer
) => {
    setLoading(true);

    try {
        const res = await axios.post<ApiResponse>(Domain + url, data);

        if (res.status === 200 && res.data) {
            // Execute the onSuccess callback with email and token
            onSuccess(res.data.data.email, res.data.token);
            stopTimer(); // Stop the timer if OTP is correct

            // Store token in AsyncStorage
            await AsyncStorage.setItem("token", res.data.token);
            const token = await AsyncStorage.getItem('token') || "";

            // Dispatch Redux action with user data, token, and media data
            dispatch(signinUser({
                userData: res.data.data,
                token: token,
                media: res.data.media, // Add media data here
            }));

            // Show success toast message
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

        // Handle error response and show appropriate toast messages
        if (err.response && err.response.data) {
            const { data } = err.response;

            if (data.errors) {
                // Show error messages for each field in errors
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
                // Show general error message if available
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: data.message,
                    position: 'bottom',
                    visibilityTime: 3000,
                    bottomOffset: 20,
                });
            } else {
                // Show a fallback error message
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
            // Handle network or server down error
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
