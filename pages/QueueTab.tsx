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
  // queueInfo de teste
  const queueInfo = { position: 15, attraction: { name: "Roda-gigante", duration: 7, qtdUsers: 15 } };
  
  const groupsForward = Math.floor((queueInfo.position-1)/queueInfo.attraction.qtdUsers);
  const timeWaiting = (groupsForward+1)*queueInfo.attraction.duration;
  const message = () => {
    if (groupsForward == 0) {
      return 'Você entrará na próxima rodada!';
    } else {
      return 'Irá valer a pena!';
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        {queueInfo.attraction.name.toUpperCase()}
      </Text>
      <Text style={{ fontStyle: 'italic', paddingBottom: 50, color: 'grey' }}>
        permite {queueInfo.attraction.qtdUsers} pessoas por rodada
      </Text>

      <Text style={{ fontSize: 100, fontWeight: 'bold', color: 'blue' }}>{queueInfo.position}º</Text>
      <Text style={{ paddingBottom: 5, color: 'blue' }}>POSIÇÃO NA FILA</Text>
      <Text style={{ paddingBottom: 70 }}>
        O tempo estimado de espera é de {timeWaiting} minutos
      </Text>

      <Button title='Check-out' color={ 'red' } onPress={ () => { setChecked(false); } }/>
      
      <Text style={{ paddingTop: 10 }}>Obrigado por esperar.</Text>
      <Text>{message()}</Text>
      {groupsForward==0 && <Text style={{color: 'red', textAlign: 'center'}}>
        Não se esqueça de realizar o check-out ao sair da fila.</Text>}
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