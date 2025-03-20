import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import themes from '../../utiltes/Themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IScreenParams} from '../../navigation/Screen_name';
import {useNavigation} from '@react-navigation/native';
import {IFooter} from '../../utiltes/Type/Component';

interface IFooterProps {
  icon: string;
  currentScreen: 'Home' | 'Rank';
}

export default function Footer(Props: IFooterProps) {
  const {icon, currentScreen} = Props;
  // Use TestIds.BANNER for testing; replace with your real Ad Unit ID in production
  const android_app_id = 'ca-app-pub-1049231223466753~4247891879';
  const ios_app_id = 'ca-app-pub-1049231223466753~1558149354';
  const adUnitID = __DEV__
    ? TestIds.BANNER
    : Platform.OS === 'android'
    ? android_app_id
    : ios_app_id;
  const navigation = useNavigation<NativeStackNavigationProp<IScreenParams>>();

  const handlePress = () => {
    if (currentScreen === 'Home') {
      navigation.navigate('Rank'); // Pass any required parameters
    } else {
      navigation.navigate('Home', {email: ''}); // No parameters needed for Home
    }
  };

  return (
    <View style={style.container}>
      <View style={style.adContainer}>
        <BannerAd
          unitId={adUnitID}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdFailedToLoad={error =>
            console.error('Ad failed to load: ', error)
          }
        />
      </View>
      <TouchableOpacity onPress={handlePress} style={style.rankButton}>
        <Icon name={icon} size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adContainer: {
    height: 80,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  rankButton: {
    backgroundColor: themes.primaryColor,
    height: 80,
    width: 80,
    borderTopLeftRadius: 80,
    borderBottomLeftRadius: 80,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
