import React from 'react';
import { Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterAttraction from "../pages/RegisterAttraction";

const AttractionStack = createNativeStackNavigator();

function AttractionsList() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Atrações</Text>
    </View>
  );
}

export default function Attractions({ navigation }) {
  return (
    <AttractionStack.Navigator initialRouteName="AttractionsList">
      <AttractionStack.Screen 
        name="AttractionsList"
        component={AttractionsList}
        options={{
          title: 'Atrações',
          headerRight: () => (
            <View style={{paddingTop: 5}}>
              <Button
                title="Cadastrar"
                onPress={() => navigation.navigate('CreateAttraction')}
              />
            </View>
          ), 
        }}
        />
      <AttractionStack.Screen
        name="CreateAttraction" 
        component={RegisterAttraction}
        options={{ title: 'Cadastrar Atração' }}
      />
    </AttractionStack.Navigator>
  )
}
