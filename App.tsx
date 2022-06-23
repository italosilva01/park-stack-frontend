import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainContainer from './navigation/MainContainer';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainContainer />
    </SafeAreaProvider>
  );
}