
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Place} from '../models/place'

class PlaceRepository {

    private static readonly KEY = 'APP_PLACE@place_document'

    private async persist (list: Place[]){
        await AsyncStorage.setItem(PlaceRepository.KEY, JSON.stringify(list))
    }

    private equals(p1: Place, p2: Place){
        return p1.latitude === p2.latitude && p1.longitude === p2.longitude
    }

    public async getPlaces() {
        const json = await AsyncStorage.getItem(PlaceRepository.KEY)
        if (json) return JSON.parse(json) as Place[]
        return []
    }

    public async save (place: Place) {
        const list =  await this.getPlaces()

        const finded = list.find(p => this.equals(p, place))
        if (finded){
            finded.name = place.name,
            finded.description = place.description
        }else {
            list.push(place)
        }

        this.persist(list)
    }

    public async remove(place: Place){
        let list =  await this.getPlaces()

        list.filter(p => !this.equals(p, place))

        this.persist(list)

    }
}

export const placeRepo = new PlaceRepository()