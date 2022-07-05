import React from 'react';
import { Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios";
import { baseUrl } from "../constants";

const QueueStack = createNativeStackNavigator();

async function findQueueInfo(setQueueInfo:Function, setChecked:Function) {
  // TODO usar id do usuário logado
  const id_user = 1;
  try {
    const response = await axios.get(`${baseUrl}atracao/usuario/${id_user}`);
    setQueueInfo(response.data.body);
  } catch(err) {
    // console.error(err);
    setQueueInfo({});
  }
}

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

function inQueue(setChecked:Function, queueInfo:any, setQueueInfo:Function) {
  const groupsForward = Math.floor((queueInfo.position-1)/queueInfo.id_attraction.num_users);
  const timeWaiting = (groupsForward+1)*queueInfo.id_attraction.duration;
  const message = () => {
    if (groupsForward == 0) {
      return 'Você entrará na próxima rodada!';
    } else {
      return 'Irá valer a pena!';
    }
  };

  async function checkout() {
    console.log("Check-out");
    // setChecked(false);
  }
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {queueInfo.id_attraction.name.toUpperCase()}
        </Text>
        <Text style={{ fontStyle: 'italic', paddingBottom: 50, color: 'grey' }}>
          permite {queueInfo.id_attraction.num_users} pessoas por rodada
        </Text>

        <Text style={{ fontSize: 100, fontWeight: 'bold', color: 'blue' }}>{queueInfo.position}º</Text>
        <Text style={{ paddingBottom: 5, color: 'blue' }}>POSIÇÃO NA FILA</Text>
        <Text style={{ paddingBottom: 70 }}>
          O tempo estimado de espera é de {timeWaiting} minutos
        </Text>

        <Button title='Check-out' color={ 'red' } onPress={checkout}/>
        
        <Text style={{ paddingTop: 10 }}>Obrigado por esperar.</Text>
        <Text>{message()}</Text>
        {groupsForward==0 && <Text style={{color: 'red', textAlign: 'center'}}>
          Não se esqueça de realizar o check-out ao sair da fila.</Text>}
      </View>
      <Button title='Atualizar fila' onPress={ async () => findQueueInfo(setQueueInfo, setChecked) } />
    </View>
  );
}

function QueueDetail({ route, navigation }:any) {
  const [checked, setChecked] = React.useState(false);
  const [queueInfo, setQueueInfo] = React.useState({});

  React.useEffect(() => {
    findQueueInfo(setQueueInfo, setChecked);
  }, [checked]);

  if(Object.keys(queueInfo).length === 0) {
    return notInQueue(route, navigation, setChecked);
  } else {
    return inQueue(setChecked, queueInfo, setQueueInfo);
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