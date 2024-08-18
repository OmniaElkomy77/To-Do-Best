import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth_stack from "./src/navigation/Auth_stack"
import { navigationRef } from "./src/navigation/navigationRef"
import Toast from 'react-native-toast-message';
import { toastConfig } from "./src/utiltes/toastConfig"
export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Auth_stack />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
