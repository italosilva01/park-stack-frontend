import React, { useState } from "react";
import { View, TextInput, Switch, StyleSheet,Text, Button, } from "react-native";
import {Formik} from 'formik';
import axios from "axios";
import { baseUrl } from "../constants";

export default function RegisterAttraction() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const createAttraction = async(e:any)=>{

    try {
      const response = await axios.post(`${baseUrl}atracao`,{...e})
      console.log(response);
    } catch (err) {
      console.error(err);
    }

  }


  return (

      <Formik
          initialValues={{name:'',status:false,description:'',duration:''}}
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
                  <TextInput placeholder="Duração" onChangeText={handleChange('duration')} onBlur={handleBlur('duration')} value={values.duration} />
              </View>

              <View style={style.status}>
                <Text>atração {`${isEnabled?"Ativa":"Inativa"}`}</Text>
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
