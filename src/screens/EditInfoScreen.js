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

const EditInfoScreen = () => {
  const [ name, setName ] = useState()
  const [ email, setEmail ] = useState()
  const [ photoURL, setPhotoURL ] = useState()
  const [ password, setPassword ] = useState()

  const navigation = useNavigation()

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
          console.log('Password updated successfully')
        })
        .catch((error) => console.log(error))
    }

    updateEmail(auth.currentUser, email)
      .then(() => {
        console.log("Email successfully updated.")
      })
      .catch((error) => console.log(error))

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    })
      .then(() => console.log('Profile updated successfully'))
      .catch((error) => console.log(error))

    await setDoc(doc(firestore, "users", auth.currentUser.uid), {
      name: name,
      email: email,
      photoURL: photoURL
    })

    navigation.pop()
    
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <SafeAreaView style={ tailwind(`items-center`) }>
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
      <Pressable 
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          tailwind(`items-center justify-center px-10 py-3 bg-red-400 rounded-lg mt-10`)
        ]}
        onPress={() => saveUserInfo()}
      >
        <Text>Save</Text>
      </Pressable>

    </SafeAreaView>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({});
