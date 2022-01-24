import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Alert, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { 
    auth, 
    createUserWithEmailAndPassword,
    firestore,
    setDoc,
    doc 
} from '../firebase/firebase';

//Components
import Button from '../components/Button';

const RegisterScreen = () => {
    const [ name, setName ] = useState()
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ photoURL, setPhotoURL ] = useState()

    const navigation = useNavigation()

    const register = () => {
        if (auth && name && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    userCredentials.user.displayName = name;
                    userCredentials.user.photoURL = photoURL;
                    setUserInfoFirestore()
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                })
        } else if (!name) {
            Alert.alert('You must fill in a name.')
        } else if (!email) {
            Alert.alert('You must fill in a valid email.')
        } else if (!password) {
            Alert.alert('You must fill in a valid password.')
        }
    }

    const setUserInfoFirestore = async () => {
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
            name: name,
            email: email,
            photoURL: photoURL
        })
    }

    return (
        <SafeAreaView style={ [{ flex: 1 }, tailwind(`items-center bg-white`) ]}>
            <View style={[ tailwind(`justify-evenly h-4/6 w-full items-center`) ]}>
                <Image 
                    source={{ uri: 'https://i.imgur.com/pH6JB4O.jpg' }}
                    style={{ height: '40%', width: '40%' }}
                    resizeMode='contain'
                />
                <Text style={ tailwind(`text-center text-3xl font-bold`) }>Register</Text>
                <View style={[ tailwind(`w-11/12 border-b border-gray-400`) ]}>
                    <TextInput 
                        label="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                        style={ tailwind(`p-3`) }
                        clearButtonMode='while-editing'
                        activeOutlineColor="#000"
                        placeholder="Name"
                        autoCorrect={ false }
                    />
                </View>
                <View style={[ tailwind(`w-11/12 border-b border-gray-400`) ]}>
                    <TextInput 
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={ tailwind(`p-3`) }
                        clearButtonMode='while-editing'
                        activeOutlineColor="#000"
                        placeholder="Email"
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />
                </View>
                <View style={[ tailwind(`w-11/12 border-b border-gray-400`) ]}>
                    <TextInput 
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={ tailwind(`p-3`) }
                        secureTextEntry
                        clearButtonMode='while-editing'
                        activeOutlineColor="#000"
                        placeholder='Password'
                        autoCorrect={ false }
                    />
                </View>
                <View style={[ tailwind(`w-11/12 border-b border-gray-400`) ]}>
                    <TextInput 
                        label="Photo URL"
                        value={photoURL}
                        onChangeText={text => setPhotoURL(text)}
                        style={ tailwind(`p-3`) }
                        clearButtonMode='while-editing'
                        activeOutlineColor="#000"
                        placeholder='Photo URL (optional)'
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />
                </View>
            </View>
            <View style={ tailwind(`w-full items-center`) }>
                <Button text="Register" pressOutFunction={register} color="red" />
            </View>
            <View style={ tailwind(`w-full items-center`) }>
                <Button text="Login" pressOutFunction={() => navigation.navigate('LoginScreen')} color="gray" />
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})
