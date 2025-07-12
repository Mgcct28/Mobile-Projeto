import { StyleSheet, View, Text } from 'react-native';
import { Place} from '../models/place';

type Props ={
    title: string
    description?: string
    OnPress: () => void
}


export default function ListItem(props: Props){
    return (
        <View style={styles.container} onTouchEnd={props.OnPress}>
            <Text style={styles.title}>{props.title} </Text>
            {props.description && (
                      <Text style={styles.description}>{props.description} </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
    },
    description: {
        color: 'gray',
    }
})