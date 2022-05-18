import React, { useState, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import RNLocation from 'react-native-location';

RNLocation.configure({
 distanceFilter: null
})


export default function SettingsScreen({navigation}) {
    const permissionHandle = async () => {
        console.log('here from settings screen')
     
     
        let permission = await RNLocation.checkPermission({
          ios: 'whenInUse', // or 'always'
          android: {
            detail: 'coarse' // or 'fine'
          }
        });
     
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
                console.log('--------------------------', location, location.longitude, location.latitude, location.timestamp)
            } else {
                console.log("Here 7")
                location = await RNLocation.getLatestLocation({timeout: 100})
                console.log('--------------------------', location, location.longitude, location.latitude, location.timestamp)
            }
            
    }
    const [pinLocation, setPinLocation] = useState('');
            const yourLocation = useCallback((location) => {
                const {latitude, longitude} = location;
                setPinLocation({
                    lat: latitude,
                    lng: longitude
                });
            }, [pinLocation])
            console.log(yourLocation, 'your location from settings ');

    return (
        <View style={{ flex:1 , alignItems: 'center', justifyContent: 'center'}}>
            <Text
            onPress={() => navigation.navigate('Home')}
            style = {{ fontSize: 26, fontWeight: 'bold'}}>
                Settings Screen
            </Text>
            <Button title="Get Location"
                onPress={permissionHandle}
            />
        </View>
    );
}