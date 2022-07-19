import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet} from 'react-native';
import axios from "axios";
import { baseUrl } from '../constants';

export default function DetailsAttraction({route}:any){
   const [currentAttractionData,setCurrenteAttractionData] = useState({} as any)
    useEffect(()=>{
        geCurrenttAttraction();
    },[])
    
    useEffect(()=>{
        console.log(currentAttractionData)
    },[currentAttractionData])

    const geCurrenttAttraction = async() =>{
        console.log(route.params.AttractionId)
        const response = await axios.get(`${baseUrl}atracao/${route.params.AttractionId}`);
        setCurrenteAttractionData(response.data.body)
    }

    const getTempoEspera = () => {
        return (Math.floor((currentAttractionData.queueSize+1)/currentAttractionData.num_users)*currentAttractionData.duration);
    }

    return(
        <View style={style.container} >
            <View>
            <Text style={style.title}> Nome: <Text style={style.italic}>{currentAttractionData.name}</Text> </Text>

            </View>
                

            <View>
                <Text style={style.title}> Descrição: <Text style={style.italic}>{currentAttractionData.description}</Text> </Text>
            </View>

            <View style={style.container}>
            
                    <Text> Duração: {currentAttractionData.duration} min.</Text>
                
                    <Text> Vagas por rodada: {currentAttractionData.num_users}</Text>

                    <Text> Pessoas na fila: {currentAttractionData.queueSize}</Text>

                    <Text> Tempo estimado de espera: {getTempoEspera()} min.</Text>
            </View>
        </View>
       
    )

}const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    title:{
        fontSize:25
    },
    italic:{
        fontStyle:'italic'
    },

    infoContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
    }


})
  