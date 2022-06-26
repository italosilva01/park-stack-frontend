import React from 'react';
import { Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AttractionStack = createNativeStackNavigator();

function AttractionsList() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Atrações</Text>
    </View>
  );
}

export default function AttractionsTab({ navigation }:any) {
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
    </AttractionStack.Navigator>
  )
}
