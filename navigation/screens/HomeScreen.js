import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, enableLatestRenderer, Marker } from 'react-native-maps';
import { useState } from 'react/cjs/react.production.min';


enableLatestRenderer();

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: 400,
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        },
        map: {
        ...StyleSheet.absoluteFillObject,
        },
   });

export default function HomeScreen({navigation}) {
    // const [selectedLocation, setSelectedLocation] = useState();

    const selectLocationHandler = event => {
        // setSelectedLocation({
        //     lat: event.nativeEvent.coordinate.latitude,
        //     lng: event.nativeEvent.coordinate.longitude
        // });
        console.log(event);
    };

    let markerCoordinates;

    // if (selectedLocation) {
    //     markerCoordinates = {
    //         latitude: selectedLocation.lat,
    //         longitude: selectedLocation.lng
    //     }
    // }

    return (
        <View style={styles.container}>
            <MapView
                onPress={selectLocationHandler}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 55.715557,
                    longitude: 21.144043,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                {/* {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>} */}
                <Marker title='Picked Location' coordinate={selectLocationHandler}></Marker>
            </MapView>
        </View>
    );
}