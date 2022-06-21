import React from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function CheckIn({ navigation }:any) {
  const [hasPermission, setHasPermission] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function handleBarCodeScanned({ data }:any) {
    console.log("QR Code data: ", data);
    navigation.navigate('QueueDetail', { checked: true });
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
