import { FlatList, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import React, { useState } from 'react';
import { auth, getDoc, doc, firestore } from '../firebase/firebase.js'

//Components
import BackButton from '../components/BackButton.js';
import PlaylistSelection from '../components/PlaylistSelection'
import tailwind from 'tailwind-rn';

const FavoritesScreen = () => {
  const [ favorites, setFavorites ] = useState()
  const getFavorites = async () => {
    const docRef = doc(firestore, "users", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    const userInfo = docSnap.data()
    setFavorites(userInfo.favorites)
  }

  getFavorites()
  return (
    <SafeAreaView>
      <BackButton />
      <View style={ tailwind(`py-3`) }>
        <Text style={ tailwind(`text-xl font-bold text-center`) }>Favorites</Text>
      </View>
      <FlatList 
        data={ favorites }
        renderItem={({ item }) => (
          <PlaylistSelection item={ item }/>
        )}
      />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
