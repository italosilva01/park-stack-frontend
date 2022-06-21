import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AttractionsTab from '../pages/AttractionsTab';
import QueueTab from '../pages/QueueTab';

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AttractionsTab"
        component={AttractionsTab}
        options={{
          tabBarLabel: 'Atrações',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="ferris-wheel" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen 
        name="QueueTab"
        component={QueueTab} 
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
