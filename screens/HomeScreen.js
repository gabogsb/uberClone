import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar, View, Image } from 'react-native';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env';

import NavOptions from '../components/NavOptions.js';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

export default function HomeScreen() {

  const dispacth = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />

        <GooglePlacesAutocomplete
          placeholder='Where From?'
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18
            }
          }}
          onPress={(data, details = null) => {
            dispacth(setOrigin({
              location: details.geometry.location,
              description: data.description
            }));

            dispacth(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'pt-BR'
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />

        <NavOptions />
      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#fff'
  },
});


