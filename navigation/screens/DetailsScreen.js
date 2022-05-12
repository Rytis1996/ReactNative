import React, { useState }  from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, enableLatestRenderer } from 'react-native-maps';
import RNLocation from 'react-native-location';

RNLocation.configure({
    distanceFilter: null
   })
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
    const [viewLocation, isViewLocation] = useState([])

    const permissionHandle = async () => {
        console.log('here')

        let location;

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
            })
            console.log(permission)
            location = await RNLocation.getLatestLocation({timeout: 100})
            console.log(location, location.longitude, location.latitude, 
                location.timestamp)
        } else {
            console.log("Here 7")
            location = await RNLocation.getLatestLocation({timeout: 100})
            console.log(location, location.longitude, location.latitude,   
                        location.timestamp)
        }
    
        console.log(permission)
      }


    return (
        <View style={styles.container}>
            <MapView
                onPress={DetailsScreen}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 55.715557,
                    longitude: 21.144043,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121, 
                }}>
            </MapView>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
       <Button
         title="Get Location"
         onPress={permissionHandle}
         />
     </View>
     <Text>Latitude: {viewLocation.latitude}</Text>
     <Text>Longitude: {viewLocation.longitude}</Text>
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