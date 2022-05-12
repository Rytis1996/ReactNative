import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, enableLatestRenderer, Marker } from 'react-native-maps';


// enableLatestRenderer();

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
       
    const [selectedLocation, setSelectedLocation] = useState('');
    const currentLocation = useCallback((event) => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
        setSelectedLocation({
            lat: latitude,
            lng: longitude
        });
    }, [selectedLocation])
// Pirminis pagal pvz....
    // const selectLocationHandler = event => {
    //     const {latitude, longitude} = event.nativeEvent.coordinate;
    //     // setSelectedLocation({
    //     //     lat: latitude,
    //     //     lng: longitude
    //     // });
    // };

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <View style={styles.container}>
            <MapView
                onPress={currentLocation}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 55.715557,
                    longitude: 21.144043,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121, 
                }}>
                {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>}
            </MapView>
        </View>
    );
}