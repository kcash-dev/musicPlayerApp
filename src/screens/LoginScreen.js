import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { auth, signInWithCredential } from '../firebase/firebase'

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

    // const signIn = () => {
    //     signInWithCredential(auth, )
    // }

    return (
        <SafeAreaView style={ [{ flex: 1 }, tailwind(`items-center bg-white`) ]}>
            <View style={[ tailwind(`h-2/3 justify-evenly w-full items-center`) ]}>
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
                    />
                </View>
            </View>
            <View style={ tailwind(`w-full items-center py-4`) }>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 },
                        tailwind(`py-3 w-1/3 rounded-lg bg-red-400 items-center`),
                        styles.shadow
                    ]}
                    // onPress={() => navigation.navigate('RegisterScreen')}
                >
                    <Text style={ tailwind(`text-white font-bold`) }>Login</Text>
                </Pressable>
            </View>
            <View style={ tailwind(`w-full items-center`) }>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 },
                        tailwind(`py-3 w-1/3 rounded-lg bg-gray-200 items-center`),
                        styles.shadow
                    ]}
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    <Text style={ tailwind(`text-red-500 font-bold`) }>Register</Text>
                </Pressable>
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
