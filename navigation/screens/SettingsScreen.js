import React, { useState, useEffect }  from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, enableLatestRenderer, Marker, Polyline } from 'react-native-maps';
import RNLocation from 'react-native-location';


    RNLocation.configure({
    distanceFilter: 5.0,
    desiredAccuracy: {
        ios: "best",
        android: "best"
      },

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

export default function SettingsScreen({navigation}) {
    const [viewLocation, isViewLocation] = useState('');
    // let locationArray = [
    //     {latitude:'', longitude: ''}
    // ];
    // const [storeLocation, setStoreLocation] = useState(locationArray);
    let location;
    let locationArray = [];

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
            console.log(location);
        }
        isViewLocation({
            lat: location.latitude,
            lng: location.longitude,
        });
        locationArray.push(viewLocation);
        console.log(locationArray, '11111111111111');
        // useEffect(() => {
        //     locationArray.push(location.latitude, location.longitude);
        // }, [viewLocation])();
        // console.log(locationArray, '0o0o0o0o0o00o0o');
    }
    // useEffect(() => {
    //     setStoreLocation(() => {
    //         prevStoreLocation
    //     })
    //     console.log(storeLocation, 'IIIIIIIIIIIIIIIIIII')
    //     console.log(locationArray, '7777777777777777777')
    // }, [viewLocation]);
    // console.log(storeLocation, '0000000000000');

    let pinCoordinates;
    if (viewLocation) {
        pinCoordinates = {
            latitude: viewLocation.lat,
            longitude: viewLocation.lng
        }
    }


    return (
        <View style={styles.container}>
            <MapView
                onPress={SettingsScreen}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.42342342342342,
                    longitude: -122.08395287867832,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121, 
                }}>
                    
                    {pinCoordinates && <Marker title='Picked Location' coordinate={{
                        latitude: pinCoordinates.latitude,
                        longitude: pinCoordinates.longitude,
                    }}></Marker>}

                    <Polyline 
                    coordinates={locationArray}
                        // coordinates={[
                        //     {latitude: 37.42342342342342, longitude: -122.08395287867832},
                        //     {latitude: 37.52342342342343, longitude: -122.08395287867832},
                        //     {latitude: 37.62342342342344, longitude: -122.08395287867832},
                        //     {latitude: 37.72342342342345, longitude: -122.08395287867832},
                        //     {latitude: 37.82342342342346, longitude: -122.08395287867832},


                        // ]}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}

                    />
    
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