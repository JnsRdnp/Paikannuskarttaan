import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Map from './screens/map';
import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';
import * as Location from 'expo-location'
import { NavigationContainer } from '@react-navigation/native'
 
import Settings from './screens/Settings';

import { createNativeStackNavigator } from '@react-navigation/native-stack'

//npx expo install --fix

//remember!!
const Stack = createNativeStackNavigator();


const settings = {
  backgroundColor: '#00a484'
}

const icons = {
  location_not_know: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}


export default function App() {
  const [icon, setIcon] = useState(icons.location_not_know)

  const [location,setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
})

  const [mapType, setMapType] = useState('standard')

const getUserPosition = async () => {
    setIcon(icons.location_searching)

    let {status} = await Location.requestForegroundPermissionsAsync()
    console.log('Status is: ',status)

    try{

        if (status !== 'granted'){
            console.log('Geolocation failed')
            return
        }

        const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
        setLocation({...location,"latitude":position.coords.latitude, "longitude":position.coords.longitude})
        // console.log({location})
        // console.log({position})
        setIcon(icons.location_found)

    } catch (error){
        console.log(error)
    }

}


  return (
    <PaperProvider>
      {/* <MainAppBar
        title="Map"
        backgroundColor={settings.backgroundColor}
        icon={icon} getUserPosition={getUserPosition}/>

      <SafeAreaView style={styles.container}>
        <Map location={location}></Map>
      </SafeAreaView> */}
      <NavigationContainer>
  
        <Stack.Navigator 
          initialRouteName='Map'
          screenOptions={{header: (props) =>
            <MainAppBar {...props}
              backgroundColor={settings.backgroundColor}
              icon={icon}
              getUserPosition={getUserPosition}/>}}>

            <Stack.Screen name='Map'>
              {() => <Map location={location} mapType={mapType}></Map>}

            </Stack.Screen>
            <Stack.Screen name='Settings'>
              {() => <Settings
              backgroundColor={settings.backgroundColor}
              mapType={mapType}
              setMapType={setMapType}
              ></Settings>}
            </Stack.Screen>
          
        </Stack.Navigator>
      </NavigationContainer>

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
});
