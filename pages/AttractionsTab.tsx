import React from 'react';
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator,NativeStackScreenProps } from '@react-navigation/native-stack';

import axios from "axios";
import { baseUrl } from "../constants";

const AttractionStack = createNativeStackNavigator();

function AttractionsList({ navigation }:any) {
  const [refreshList, setRefreshList] = React.useState(false);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(`${baseUrl}atracao`);
      setList(response.data.body);
    })();
  }, [refreshList]);

  return (
    <View style={style.container}>
      <FlatList
        data={list}      
        renderItem={ ({item}) => 
          <TouchableOpacity style={style.containerAttraction} onPress={()=>{  navigation.navigate('DetailsAttraction',{AttractionId:item.id})}}>
            <Text style={style.titleAttraction}>{item.name.toUpperCase()} </Text>
          </TouchableOpacity>
        }
      />
      <Button onPress={ () => setRefreshList(!refreshList) } title='Atualizar lista'/>
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

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAttraction: {
    backgroundColor: 'white',
    height: 50,
    marginTop: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  titleAttraction: {
    fontWeight: 'bold',
  }
});
