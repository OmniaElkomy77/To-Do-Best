import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import Setting from './src/screens/Main/Setting';
import Rank from './src/screens/Main/Rank';

export default function App() {
  useEffect(() => {
    // Request Ads consent information when the app loads
    AdsConsent.requestInfoUpdate().then((consentStatus: any) => {
      if (consentStatus === AdsConsentStatus.REQUIRED) {
        AdsConsent.showForm().then((newStatus: any) => {
          // Optionally handle the new consent status here
        });
      }
    });
  }, []);

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
