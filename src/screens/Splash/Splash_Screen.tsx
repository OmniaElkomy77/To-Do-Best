import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import images from '../../common/images';
import Status_Bar from '../../common/Status_bar';
import themes from '../../utiltes/Themes';
const Splash_Screen = () => {
    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center',
            backgroundColor: themes.white
        }}>
            <StatusBar backgroundColor={themes.white} barStyle={"dark-content"} />
            <Image
                source={images.Do_Best}
                style={{ height: 150, width: 150, }}
                resizeMode="contain"
            />
        </View>
    );
};
export default Splash_Screen;