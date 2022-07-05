import React from 'react';
import { View, Text, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";
import { baseUrl } from "../constants";

export default function CheckIn({ navigation }:any) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function handleBarCodeScanned({ data }:any) {
    if(!scanned) {
      setScanned(true);
      let checked = false;
      // TODO usar id do usuário logado
      const body = { idAttraction: data, idUser: 1 };
      try {
        const response = await axios.post(`${baseUrl}checkin`,{...body});
        if(response.data.status == 201) {
          checked = true;
          Alert.alert("Sucesso", response.data.message);
        } else {
          Alert.alert("Erro", response.data.message);
        }
      } catch (err) {
        Alert.alert("Erro", "Houve um erro inesperado");
        // console.error(err);
      }
      navigation.navigate('QueueDetail', { checked });
    }
  };

  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {hasPermission &&
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            display: 'flex'
          }}
        />
      }
      {!hasPermission && 
        <Text>O app precisa de acesso à câmera</Text>
      }
    </View>
  );
}
