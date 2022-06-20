import React from 'react';
import { Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const QueueStack = createNativeStackNavigator();

function QueueDetail() {
  const [inQueue, setInQueue] = React.useState(false);

  if(!inQueue) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ paddingBottom: 10 }}>
          Você não está em nenhuma fila
        </Text>
        <Button title='Check-in' onPress={ () => { setInQueue(true); } }/>
      </View>
    );
  } else {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Apenas para teste */}
        <Button title='Check-out' onPress={ () => { setInQueue(false); } }/>
      </View>
    );
  }
}

export default function Queue() {
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