import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
const RegisterScreen = () => {
    const [ name, setName ] = useState()
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()

    const navigation = useNavigation()

    return (
        <SafeAreaView style={ [{ flex: 1 }, tailwind(`items-center`) ]}>
            <View style={[ tailwind(`justify-evenly h-5/6 w-full items-center`) ]}>
                <Text style={ tailwind(`text-center text-3xl font-bold`) }>Register</Text>
                <View style={[ tailwind(`w-11/12 bg-white rounded-lg`), styles.shadow ]}>
                    <TextInput 
                        label="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                        style={ tailwind(`p-3`) }
                        clearButtonMode='always'
                        activeOutlineColor="#000"
                        placeholder="Name"
                    />
                </View>
                <View style={[ tailwind(`w-11/12 bg-white rounded-lg`), styles.shadow ]}>
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
                <View style={[ tailwind(`w-11/12 bg-white rounded-lg`), styles.shadow ]}>
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
            <View>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text>Already signed up? Login here.</Text>
                </Pressable>
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
