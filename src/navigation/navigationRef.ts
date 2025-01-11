import { createNavigationContainerRef } from '@react-navigation/native';
import { IScreenNames, IScreenParams } from './Screen_name';


export const navigationRef = createNavigationContainerRef<IScreenParams>();
export function navigate(name: IScreenNames | any, params?: IScreenParams) {
    if (navigationRef.isReady()) {
        navigationRef.current?.navigate(name, params);
    }
}
