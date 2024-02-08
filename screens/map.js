import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import MapView, { Marker } from 'react-native-maps'


const Map = (props) => {

    const [marker,setMarker] = useState(null)



    // useEffect(() => {

    // // Use effectin sisälle joudutaan tekemään nimetön async funktio jos kutsutaaan asyncronista functiota
    //     (async() => {
    //         getUserPosition()
    //     })()
        
    // }, []);

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarker(coords)
    }
    

    return (
        <MapView
         style={styles.map}
         region={props.location} 
         mapType={props.mapType}
         onLongPress={showMarker}>

            {marker && 
            <Marker
            title='My marker'
            coordinate=
            {{latitude: marker.latitude,longitude: marker.longitude}}
            />}

        
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    }
})