import { NavigationProp } from '@react-navigation/native';

export interface IHeader {

    title?: string,
    text?: string,
    clickable_text?: string,
    onPress: any,
    back_icon?: any,
    navigation?: NavigationProp<ReactNavigation.RootParamList> | null,
    photo: any,
    onPress2?: any,
    activate_account?: boolean
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
    icon_name: string,
    editable?: boolean,
    settingEmailColor?: boolean

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
    error?: any,
    editable?: boolean,
    onToggleExpand?: any,
    isExpanded: boolean,
    settingEmailColor?: boolean

}

export interface IUpdateSettingData {
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface IFooter {
    icon: string
}
interface IRankData {
    username: string;       // Username of the player
    overall_rank?: number;  // Optional properties for each rank
    monthly_rank?: number;
    week_rank?: number;
    app_week_rank?: number; // Overall rank of the player
    country: string;        // Country of the player
    avatar_id: Number,
    gender: string
    rank?: number | undefined,
    points?: number | undefined,
    overall_rank_points: number;
    monthly_rank_points: number;
    week_rank_points: number;
    app_week_rank_points: number;
}

// Define the structure of each item in the items array
interface IItem {
    username: string;           // Name of the item
    overall_rank?: number;  // Optional properties for each rank
    monthly_rank?: number;
    week_rank?: number;
    app_week_rank?: number;   // Overall rank of the player
    country: string;        // Country of the player
    avatar_id: Number,
    gender: string,
    rank?: number | undefined
    points?: number | undefined,
    overall_rank_points: number;
    monthly_rank_points: number;
    week_rank_points: number;
    app_week_rank_points: number;

    // Value associated with the item
}

// Define the interface for RankCustom props
export interface IRankCustom {
    generalRank: IRankData[];  // An array of IRankData
    userRank: IItem[];     // An array of IItem
    tabType: string,
    media?: {
        avatar_id: number,
        category_id: string,
        link: string,
        type: string,
        duration?: number

    }
}

export interface IModalMedia {
    visible: boolean,
    onClose: any,
    media: any
}

export interface IErrorBoundary {
    children: React.ReactNode;
}

export interface IStateErrorBoundary {
    error: boolean;
}
