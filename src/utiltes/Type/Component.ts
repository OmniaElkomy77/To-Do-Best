import { NavigationProp } from '@react-navigation/native';
import { string } from 'yup';
export interface IHeader {

    title?: string,
    text?: string,
    clickable_text?: string,
    onPress: any,
    back_icon?: any,
    navigation?: NavigationProp<ReactNavigation.RootParamList> | null,
    photo: any
}
export interface IButton {
    Button_title?: string,
    submit: any,
    isloading?: boolean
}
export interface ITextInput {
    secureTextEntry?: boolean,
    errorMessage: any
    isPassword?: boolean;
    value: string;
    onChangeText: any;
    placeholder: string,
    error: any,
    onBlur: any,
    icon_name: string

}
export interface IRadioButton {
    selectedId: string | undefined,
    onSelect: (id: string) => void,
    error?: boolean
}
export interface IAvatarButton {
    onPress: any,
    text?: string,
    selectedAvatar: any
}
export interface ICountryButton {
    country: string,
    onPress: any,
    icon_name: string,
    error?: boolean,
    flag: any

}
export interface IavatarModal {
    visible?: boolean,
    onClose: (avatar: any, name: string, id: string) => void,
    selectedAvatar: any,
}
export interface ICountryModal {
    visible?: boolean,
    onClose: any
}
export interface IGenderModal {
    visible?: boolean,
    onClose: any
}
export interface IGenderButton {
    gender: any,
    onPress: any,
    icon_name: string,
    error?: boolean
}
