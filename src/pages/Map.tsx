import React from 'react';
import * as Location from 'expo-location';
import MapView, { LongPressEvent, Marker } from 'react-native-maps';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

import { placeRepo } from '../services/place.repo';
import { Place } from '../models/place';

export default function MapPage() {

  const navigation = useNavigation<NavigationProp<any>>()
  const [location, setLocation] = React.useState<Location.LocationObject>();

  const[places, setPlaces] = React.useState<Place[]>([])
  
  async function getGeoLocation() {
          
      let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setLocation(await Location.getCurrentPositionAsync());
      }
  }
  

  React.useEffect(() => {
    getGeoLocation()
  }, [])

  useFocusEffect(() =>{
        placeRepo.getPlaces().then(list => setPlaces(list))
  })

  function goToNewPlace(event: LongPressEvent){
        navigation.navigate('Place', event.nativeEvent.coordinate)
  }

  function goToEditPlace(place: Place){
    navigation.navigate('Place', place)
}
      


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
        <MapView
         style={styles.map}
         showsUserLocation={true}
         onLongPress={goToNewPlace}
         initialCamera={location && {
           center:{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
           },
           heading: 0,
           pitch: 0,
           zoom: 10

          } }      
      >
        { places.map( place => (
           <Marker
           key={`${place.latitude}-${place.longitude}`}
           title={place.name}
           coordinate={{

              latitude:place.latitude,
              longitude:place.longitude
           }}
           onPress={() => goToEditPlace(place)}
     />

        )) }
       
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width: '100%',
    height: '100%',
  },
});
