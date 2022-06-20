import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Attractions from '../pages/Attractions';
import Queue from '../pages/Queue';

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Attractions" 
        component={Attractions}
        options={{
          tabBarLabel: 'Atrações',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="ferris-wheel" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen 
        name="Queue" 
        component={Queue} 
        options={{
          tabBarLabel: 'Fila',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="human-queue" color={color} size={26} />
          )
        }}
      /> 
    </Tab.Navigator>
  )
}
