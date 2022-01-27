import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { 
  auth, 
  firestore, 
  getDoc, 
  doc, 
  updateEmail, 
  updatePassword, 
  setDoc,
  updateProfile 
} from '../firebase/firebase.js'
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated';

//Components
import BackButton from '../components/BackButton'
import Button from '../components/Button.js';

const EditInfoScreen = () => {
  const [ name, setName ] = useState()
  const [ email, setEmail ] = useState()
  const [ photoURL, setPhotoURL ] = useState()
  const [ password, setPassword ] = useState()
  const buttonSize = useSharedValue(1)

  const navigation = useNavigation()

  const transitionConfig = {
    duration: 100
  }
  
  const buttonAnimatedStyles = useAnimatedStyle(() => {
    return {
        transform: [{ scale: withTiming(buttonSize.value, transitionConfig) }]
    }
  })

  const getUserInfo = async () => {
    const docRef = doc(firestore, "users", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    const userInfo = docSnap.data()

    setName(userInfo.name)
    setEmail(userInfo.email)
    setPhotoURL(userInfo.photoURL)
  }

  const saveUserInfo = async () => {
    if(password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
        })
        .catch((error) => console.log(error))
    }

    updateEmail(auth.currentUser, email)
      .then(() => {
      })
      .catch((error) => console.log(error))

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    })
      .then(() => null)
      .catch((error) => console.log(error))

    await setDoc(doc(firestore, "users", auth.currentUser.uid), {
      name: name,
      email: email,
      photoURL: photoURL
    })
    
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <SafeAreaView style={ tailwind(`items-center`) }>
      <BackButton />
      <Text style={ tailwind(`text-xl font-bold text-center mt-20`) }>Edit Info</Text>
      <View style={ tailwind(`w-5/6`) }>
        <Text style={ tailwind(`font-bold text-lg`) }>Name</Text>
        <TextInput 
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={ tailwind(`p-3 border-b`) }
          clearButtonMode='while-editing'
          activeOutlineColor="#000"
          placeholder={ name }
          autoCapitalize='none'
          autoCorrect={ false }
        />
      </View>
      <View style={ tailwind(`w-5/6`) }>
        <Text style={ tailwind(`font-bold text-lg`) }>Email</Text>
        <TextInput 
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={ tailwind(`p-3 border-b`) }
          clearButtonMode='while-editing'
          activeOutlineColor="#000"
          placeholder={ email }
          autoCapitalize='none'
          autoCorrect={ false }
        />
      </View>
      <View style={ tailwind(`w-5/6`) }>
        <Text style={ tailwind(`font-bold text-lg`) }>Email</Text>
        <TextInput 
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={ tailwind(`p-3 border-b`) }
          clearButtonMode='while-editing'
          activeOutlineColor="#000"
          placeholder={ email }
          autoCapitalize='none'
          autoCorrect={ false }
        />
      </View>
      <View style={ tailwind(`w-5/6`) }>
        <Text style={ tailwind(`font-bold text-lg`) }>Photo URL</Text>
        <TextInput 
          label="Photo URL"
          value={photoURL}
          onChangeText={text => setPhotoURL(text)}
          style={ tailwind(`p-3 border-b`) }
          clearButtonMode='while-editing'
          activeOutlineColor="#000"
          placeholder={ photoURL }
          autoCapitalize='none'
          autoCorrect={ false }
        />
      </View>
      <Button 
        text="Save"
        pressOutFunction={saveUserInfo}
        color="red"
      />
    </SafeAreaView>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({

});
