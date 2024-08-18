
import { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';
import themes from './Themes';


export const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: themes.primaryColor, backgroundColor: themes.white }} // Custom success background and border color
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: themes.black,
            }}
            text2Style={{
                fontSize: 14,
                color: themes.black,
            }}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: themes.red, backgroundColor: themes.white }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: themes.red,
            }}
            text2Style={{
                fontSize: 14,
                color: themes.red,
            }}
        />
    ),
};