import React, { useState } from "react";
import { View, TextInput, Switch, StyleSheet,Text, Button, Alert } from "react-native";
import {Formik} from 'formik';
import axios from "axios";
import { baseUrl } from "../constants";

export default function RegisterAttraction({ navigation }:any) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const createAttraction = async(e:any)=>{
    try {
      const response = await axios.post(`${baseUrl}atracao`,{...e});

      if(response.data.status == 201) {
        Alert.alert("Sucesso", response.data.message);
        navigation.navigate('AttractionsList');
      }
      else {
        let messageError = `${response.data.message}:`;
        for(let item in response.data.errors) {
          messageError += `\n- ${response.data.errors[item]}`;
        }
        Alert.alert("Erro", messageError);
      }
    } catch (err) {
      Alert.alert("Erro", "Houve um erro inesperado");
      console.error(err);
    }
  }

  return (
      <Formik
          initialValues={{name:'',status:true,description:'',duration:'',num_users:''}}
          onSubmit={e =>createAttraction(e)}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue })=>(
            <View style={style.container}>
              <View style={style.containerName}>
                <TextInput style={style.attractionName} placeholder="Nome da atração" onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
              </View>
              <View style={style.infoSecundary}>
                <View style={style.description}>
                  <TextInput placeholder="Descrição" multiline={true} onChangeText={handleChange('description')} onBlur={handleBlur('description')} value={values.description}/>
                </View>
                  <TextInput placeholder="Duração" onChangeText={handleChange('duration')} onBlur={handleBlur('duration')} value={values.duration} keyboardType='numeric'/>
                  <TextInput placeholder="Vagas" onChangeText={handleChange('num_users')} onBlur={handleBlur('num_users')} value={values.num_users} keyboardType='numeric'/>
              </View>

              <View style={style.status}>
                <Text>Atração {`${isEnabled?"ativa":"inativa"}`}</Text>
                <Switch
                    trackColor={{ false: "red", true: "green" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={values.status}
                    accessibilityLabel="Status"
                    onChange={()=>setFieldValue("status",!values.status)}
                />
              </View>
              <Button
                  title="Cadastrar"
                  onPress={handleSubmit}
              />
            </View>
        )}
      </Formik>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '90%',
    height: '80%',
  },
  attractionName:{
    fontSize: 25,
  },
  containerName:{
    height:'15%',
    justifyContent:'center',
  },
  description:{
    height:'70%',
    marginBottom:'5%'
  },
  status:{
    alignItems:'center',
    marginBottom:20

  },
  infoSecundary:{
    width:'90%',
    height:'40%',
  }
});
