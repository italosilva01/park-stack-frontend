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
        <View style={style.containerNameStatus}>
        <TextInput placeholder="Nome da atração" onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
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
        
        </View>
          <View style={style.infoSecundary}>
          <TextInput placeholder="descrição" multiline={true} onChangeText={handleChange('description')} onBlur={handleBlur('description')} value={values.description}/>
          <TextInput placeholder="duração" onChangeText={handleChange('duration')} onBlur={handleBlur('duration')} value={values.duration} />
      
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    border:'1px solid black',
    backgroundColor:'orange',
  },

  containerNameStatus:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
  },
  status:{
    alignItems:'center',
    //flexDirection:"row"

  },
  infoSecundary:{

    flexDirection:"row",
    justifyContent:"space-between",
    
  }
});
