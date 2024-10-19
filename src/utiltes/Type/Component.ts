import { NavigationProp } from '@react-navigation/native';

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
    errorMessage?: any
    isPassword?: boolean;
    value?: string;
    onChangeText: any;
    placeholder?: string,
    error?: any,
    onBlur?: any,
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
export interface IHeaderData {
    icon_name: string,
    data: string
}
export interface IAddCardModal {
    visible?: boolean
    onClose: any,
    token: string,
    onAddCard: any
}
export interface ICard {
    onAddCard: any,
    token: string,
    onClose: any
}
export interface ICardLevelButton {
    level: string,
    onPress: any,
    borderColor: string,
    isSelected: boolean
}
export interface ICardWeekButton {
    lable: string,
    onPress: any,
    isSelected: boolean
}
export interface AddButtonProps {
    // onPress: () => void;
    isScrolled: boolean,
    onCardAdded: any
}
export interface ICardData {
    id?: string
    title: string,
    description: string,
    level: string,
    time: string,
    app_week: string,
    du_date: string,
    status: string,


}
export interface ICardAdd {
    title: string,
    description: string,
    level: string,
    time: string,
    app_week: string,
    du_date: string,
}
export interface ICardHome {
    id: string
    title: string,
    description: string,
    level: string,
    time: string,
    app_week: string,
    du_date: string,
    status: string,
}
export interface ITaskView {
    card: ICardData;
    onCardDeleted: any,
    onCardEdited: any,


}
export interface IMainHeader {
    username: string,
    points: string,
    icon_setting?: boolean,

}
export interface IDeleteConfirmationModal {
    isVisible: boolean,
    onClose: () => void,
    onDelete: () => void
}

export interface ICardInput {
    placeholder: string,
    value: string,
    onChangeText: any,
    multiline: boolean,
    keyboardType?: boolean | undefined
}

export interface IEditCardModal {
    visible: boolean;
    onClose: () => void;
    card: ICardData;
    handleCardEdited: () => void

}
export interface ISettingData {
    icon_name: string,
    label: string,
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    isAvatar?: boolean;
    selectedAvatar?: any,
    onAvatarPress?: any,
    isPasswordSection?: boolean,
    passwordValue?: string,
    passwordConfirmationValue?: string,
    onPasswordChange?: any,
    onPasswordConfirmationChange?: any,
    onBlur?: any,
    error?: any

}

export interface IUpdateSettingData {
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}
export interface IRankCustom {
    title: string
}
