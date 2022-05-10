import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, enableLatestRenderer, Marker } from 'react-native-maps';

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


export default function DetailsScreen({navigation}) {
    const locationUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAiwgE66oGwMBwFH1EN6y2gR6I9vlyGKUk';

    async function getLocation() {
        const response = await fetch(locationUrl);
        const data = await response.json();
        console.log(data);
    }

    return (
        <View style={styles.container}>
            <MapView
                onPress={getLocation}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 55.715557,
                    longitude: 21.144043,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121, 
                }}>
            </MapView>
        </View>
        // <View style={{ flex:1 , alignItems: 'center', justifyContent: 'center'}}>
        //     <Text
        //     onPress={() => navigation.navigate('Home')}
        //     style = {{ fontSize: 26, fontWeight: 'bold'}}>
        //         Details Screen
        //     </Text>
        // </View>
    );
}