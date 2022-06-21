import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../navigation/Tabs';
import RegisterAttraction from "../pages/RegisterAttraction";
import CheckIn from '../pages/CheckIn';

const Stack = createNativeStackNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
        <Stack.Screen
          name="CreateAttraction" 
          component={RegisterAttraction}
          options={{ title: 'Cadastrar Atração' }}
        />
        <Stack.Screen 
          name="QueueCheckIn"
          component={CheckIn}
          options={{ title: 'Check-in' }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
