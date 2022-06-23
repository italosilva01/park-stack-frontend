import React from 'react';
import { Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const QueueStack = createNativeStackNavigator();

function notInQueue(route:any, navigation:any, setChecked:Function) {
  if(route.params && route.params.checked) {
    setChecked(route.params.checked);
    route.params.checked = undefined;
  }

  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ paddingBottom: 10 }}>
        Você não está em nenhuma fila
      </Text>
      <Button title='Check-in' onPress={ () => { navigation.navigate('QueueCheckIn') } }/>
    </View>
  );
}

function inQueue(setChecked:Function) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Apenas para teste */}
      <Button title='Check-out' onPress={ () => { setChecked(false); } }/>
    </View>
  );
}

function QueueDetail({ route, navigation }:any) {
  const [checked, setChecked] = React.useState(false);

  if(!checked) {
    return notInQueue(route, navigation, setChecked);
  } else {
    return inQueue(setChecked);
  }
}

export default function QueueTab() {
  return (
    <QueueStack.Navigator initialRouteName="QueueDetail">
      <QueueStack.Screen 
        name="QueueDetail"
        component={QueueDetail}
        options={{ title: 'Fila' }}  
      />
    </QueueStack.Navigator>
  )
}