import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { auth, signInWithEmailAndPassword } from '../firebase/firebase'

//Components
import Button from '../components/Button'

const LoginScreen = () => {
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()


    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace('Home')
            }
        });

        return unsubscribe;
    }, [])

    const signIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
            })
            .catch((error) => console.log(error))
    }

    return (
        <SafeAreaView style={ [{ flex: 1 }, tailwind(`items-center bg-white`) ]}>
            <KeyboardAvoidingView 
                style={[ tailwind(`h-2/3 justify-evenly w-full items-center`) ]}
                behavior={ Platform.OS === 'ios' ? "padding" : "height" }
            >
                <Image 
                    source={{ uri: 'https://i.imgur.com/pH6JB4O.jpg' }}
                    style={{ height: '60%', width: '60%' }}
                    resizeMode='contain'
                />
                <Text style={ tailwind(`text-center text-3xl font-bold`) }>Login</Text>
                <View style={[ tailwind(`w-11/12 border-b border-gray-400`) ]}>
                    <TextInput 
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={ tailwind(`p-3`) }
                        clearButtonMode='always'
                        activeOutlineColor="#000"
                        placeholder="Email"
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />
                </View>
                <View style={[ tailwind(`w-11/12 border-b border-gray-400`)]}>
                    <TextInput 
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={ tailwind(`p-3`) }
                        secureTextEntry
                        clearButtonMode='always'
                        activeOutlineColor="#000"
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={ tailwind(`w-full items-center py-4`) }>
                <Button text="Login" pressOutFunction={signIn} color="red"/>
            </View>
            <View style={ tailwind(`w-full items-center`) }>
                <Button text="Register" pressOutFunction={() => navigation.navigate('RegisterScreen')} color="gray"/>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

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
