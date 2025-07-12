import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, StyleSheet, TextInput, Text, View, Alert } from "react-native";
import { LatLng } from "react-native-maps";

import { placeRepo } from "../services/place.repo";
import { Place } from "../models/place";
import React from "react";

export default function PlacePage(){

    const route = useRoute()
    const navigation = useNavigation<NavigationProp<any>>()
    const params = route.params as Place

    const [name, setName] = React.useState(params.name? params.name : '')
    const [description, setDescription] = React.useState(params.description? params.description: '')

    React.useEffect(() => {
        if (params.name) navigation.setOptions({title: 'Edição do Lugar'})
    }, [])


    function remove(){
        const place = {
            latitude: params.latitude,
            longitude: params.longitude
        }

        placeRepo.remove(place) .then(() => {
             navigation.goBack() })
    }

    function save() {
         if (!name && name.trim() === ''){
            Alert.alert('O Nome é obrigatório')
         }
         
        console.log('Nome:', name)
        console.log('Desc' , description)

        placeRepo.save({
            name, description,
            latitude: params.latitude,
            longitude: params.longitude
        }).then(() =>{
            navigation.goBack()
        })
    }

   return(
      <View style={styles.container} >
         <Text>Latitute:{params.latitude} </Text>
         <Text>Longitude:{params.longitude} </Text>

         <Text style={styles.label}> Informe os dados do novo local: </Text>

         <TextInput 
              value={name}
              style={styles.inputName} 
              placeholder="Nome" onChangeText={setName}
         />

         <TextInput 
              value={description}
              style={styles.inputDescription} 
              placeholder="Descrição" 
              onChangeText={setDescription}
              numberOfLines={10} multiline
              
          />

          <View style={styles.button}>
             <Button title='Salvar' onPress={save}/>
          </View>
           
           { params.name && (
          <View style={styles.button}>
             <Button title='Deletar' onPress={remove} color={'red'}/>
          </View>
          )}
    
       </View>
   )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center",
        marginHorizontal: 20,
    },
    inputName: {
        borderWidth: 1,
        borderRadius: 3,
        marginVertical:10,
        marginHorizontal: 20,
    },
    inputDescription: {
        height: 140,
        borderWidth: 1,
        borderRadius: 3,
        marginVertical:10,
        marginHorizontal: 20,
        textAlign: "justify",
        textAlignVertical: "top",
    },
    button: {
        marginTop: 30,
        marginHorizontal: 50,
    }
})