import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";


import { Place } from '../models/place';
import { placeRepo } from "../services/place.repo";
import ListItem from "../components/ListItem";

export default function LisPage(){

    const navigation = useNavigation<NavigationProp<any>>()
    const [places, setPlaces] = React.useState<Place[]>([])

    useFocusEffect(() => {
         placeRepo.getPlaces().then(list => setPlaces(list))
    })

      function goToEditPlace(place: Place){
        navigation.navigate('Place', place)
    }

    return (
        <View style={{ marginTop: 50 }}>
            <FlatList
                data={places}
                keyExtractor={place => `${place.latitude}-${place.longitude}`}
                renderItem = {({ item }) => (
                   <ListItem  title={item.name!} description={item.description} 
                   OnPress={() => goToEditPlace(item)}
                   />
                )}
            />
        </View>
    )
}