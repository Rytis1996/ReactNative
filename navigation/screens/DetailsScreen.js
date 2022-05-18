import React, { useState, useCallback }  from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, enableLatestRenderer, Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';

    RNLocation.configure({
    distanceFilter: null
    });

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
            height: 400,
            },
    });

export default function DetailsScreen({navigation}) {
    const [viewLocation, isViewLocation] = useState('');
    let location;

    const permissionHandle = async () => {
       
        let permission = await RNLocation.checkPermission({
          ios: 'whenInUse', // or 'always'
          android: {
            detail: 'coarse' // or 'fine'
          }
        });
 
        if(!permission) {
            permission = await RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "coarse",
                    rationale: {
                        title: "We need to access your location",
                        message: "We use your location to show where you are on the map",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            });
            location = await RNLocation.getLatestLocation({timeout: 100})
        } else {
            location = await RNLocation.getLatestLocation({timeout: 100})
        }
        isViewLocation({
            lat: location.latitude,
            lng: location.longitude
        });
        // console.log('last view location', viewLocation);

    }
    console.log('last view location 2 ', viewLocation);
    console.log('last view location 3 ', location);

    let pinCoordinates;
    if (viewLocation) {
        pinCoordinates = {
            latitude: viewLocation.lat,
            longitude: viewLocation.lng
        }
    }

    console.log('pincord', pinCoordinates);

    return (
        <View style={styles.container}>
            <MapView
                onPress={DetailsScreen}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: pinCoordinates.latitude,
                    longitude: pinCoordinates.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121, 
                }}>
                    
                    {pinCoordinates && <Marker title='Picked Location' coordinate={{
                        latitude: pinCoordinates.latitude,
                        longitude: pinCoordinates.longitude,
                    }}></Marker>}
    
            </MapView>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
       <Button
         title="Get Location"
         onPress={permissionHandle}
         />
     </View>
     <Text>Latitude: {viewLocation.lat}</Text>
     <Text>Longitude: {viewLocation.lng}</Text>
     <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
       <Button
         title="Send Location"
        />
         </View>
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