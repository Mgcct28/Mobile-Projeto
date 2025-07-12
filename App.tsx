
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';


import MapPage from './src/pages/Map';
import PlacePage from './src/pages/Place';
import ListPage from './src/pages/List';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MapStack(){
  return(
       <Stack.Navigator>
             <Stack.Screen name='Map' component={MapPage} options={{ headerShown: false, title:'Mapa' }}/>
             <Stack.Screen name= 'Place' component={PlacePage} options={{title: 'Novo Cadastro de Localização'}} />
       </Stack.Navigator>
  )
}

function ListStack(){
  return(
    <Stack.Navigator>
        <Stack.Screen name='List' component={ListPage} options={{ headerShown: false, title:'Mapa' }}/>
        <Stack.Screen name= 'Place' component={PlacePage} options={{title: 'Novo Cadastro de Localização'}} />
    </Stack.Navigator>
      
  )
}

export default function App() {
     return (
        <NavigationContainer>
             <Tab.Navigator
                   screenOptions= { ({route}) => ({ 
                     tabBarIcon: ({color, size}) => {
                         let iconName: 'map' | 'list'

                         if (route.name === 'MapTab') iconName = 'map'
                         else iconName = 'list'

                          return <Ionicons name = {iconName} size={size} color = {color} />
                        }  
                    })}             
          >
                   <Tab.Screen  
                   name= 'MapTab' component={MapStack} 
                   options={{ 
                        title: 'Mapa', headerShown: false,
                    }} 
                   />
                   <Tab.Screen  
                   name= 'ListTab' component={ListStack} 
                   options={{ 
                       title: 'Lista',  headerShown: false, 
                   }}
                  />
              </Tab.Navigator>
          </NavigationContainer>  
  )
}

