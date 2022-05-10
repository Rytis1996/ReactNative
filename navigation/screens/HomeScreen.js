import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, enableLatestRenderer, Marker } from 'react-native-maps';
import { useState } from 'react/cjs/react.production.min';
// import GeoLocation from './geolocation/GeoLocation';



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
       
    // const [selectedLocation, setSelectedLocation] = useState('');

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
                // console.log(GeoLocation.GeoLocation.data)
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 55.715557,
                    longitude: 21.144043,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121, 
                }}>
                    <Marker source={{uri:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dmap%2BMarker&psig=AOvVaw0Hd66ltTRqbI5W72f8qjbN&ust=1652187909687000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKi4q9690vcCFQAAAAAdAAAAABAD'}} coordinate={{
                        latitude: 55.715557,
                        longitude: 21.144043,
                    }} style={{width: 100, height: 100}}/>
                {/* {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>} */}
            </MapView>
        </View>
    );
}