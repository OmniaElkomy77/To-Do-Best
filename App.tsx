import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import InternetConnectionView from './src/component/General/InternetConnectionView';
import ErrorBoundary from './src/component/General/ErrorBoundry';
import Splash_Screen from './src/screens/Splash/Splash_Screen';
export default function App() {
  useEffect(() => {

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
        <ErrorBoundary>
          <AppNavigator />
        </ErrorBoundary>
      </PersistGate>
      <InternetConnectionView />
    </Provider>

  );
}
