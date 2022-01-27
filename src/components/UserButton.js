import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { auth, firestore, getDoc, doc } from '../firebase/firebase.js' 
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const UserButton = () => {
    const [ isShowing, setIsShowing ] = useState(false)
    const [ statusBarHeight, setStatusBarHeight ] = useState();
    const playerHeight = useSharedValue(windowHeight + 65)
    const [ loading, setLoading ] = useState(false)

    const navigation = useNavigation()

    const getStatusBar = () => {
        if (Platform.OS === 'ios') {
            const height = getStatusBarHeight()
            setStatusBarHeight(height)
        } else {
            setStatusBarHeight(StatusBar.currentHeight)
        }
    }

    useEffect(() => {
        getStatusBar()
    }, [])

    const transitionConfig = {
        duration: 200
    }
    const playerBarStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(playerHeight.value, transitionConfig) }]
        }
    })

    const signOut = () => {
        auth.signOut()
            .then(() => navigation.navigate('User'))
    }

    useEffect(async () => {
        try {
            setLoading(true)
            const docRef = doc(firestore, "users", auth.currentUser.uid)
            const docSnap = await getDoc(docRef)
            const userInfo = docSnap.data()
            auth.currentUser.displayName = userInfo.name
            auth.currentUser.photoURL = userInfo.photoURL
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <View style={[ tailwind(`absolute top-6 right-3`), styles.shadow, { zIndex: 1 } ]}>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    tailwind(`items-center bg-gray-100 rounded-full p-1`)
                ]}
                onPress={() => {
                    if(!isShowing) {
                        setIsShowing(true)
                        playerHeight.value = 0 + 20
                    } else {
                        setIsShowing(false)
                        playerHeight.value = windowHeight + 65
                    }
                }}
            >
                <Image 
                    source={{ uri: auth.currentUser.photoURL }}
                    style={[{ width:32, height: 32 }, tailwind(`rounded-full`)]}
                    resizeMode='cover'
                />
            </Pressable>
            <Animated.View style={[ tailwind(`absolute bg-white bg-opacity-100`), { width: windowWidth + 10, height: windowHeight, right: '-50%', top: '-75%', zIndex: 1, }, playerBarStyles  ]}>
                <View style={[ tailwind(`bg-white h-1/6 w-full`), styles.shadow ]}>
                    <View style={ tailwind(`flex-row w-full top-4`) }>
                        <View style={[ tailwind(`justify-center items-center bg-gray-100 rounded-full p-1 h-5/6 w-1/5 mx-5`), styles.shadow ]}>
                            <Pressable
                                style={({ pressed }) => [
                                    { opacity: pressed ? 0.5 : 1 }
                                ]}
                            >
                                <Image 
                                    source={{ uri: auth.currentUser.photoURL }}
                                    style={[{ width: 90, height: 90 }, tailwind(`rounded-full`)]}
                                    resizeMode='cover'
                                />
                            </Pressable>
                        </View>
                        <View>
                            <Text style={ tailwind(`text-xl font-bold`) }>Hello, { auth.currentUser.displayName }</Text>
                            <Pressable
                                style={({ pressed }) => [
                                    { opacity: pressed ? 0.7 : 1 },
                                    tailwind(`mt-3`)
                                ]}
                                onPress={() => navigation.navigate('EditInfoScreen')}
                            >
                                <Text style={ tailwind(``) }>Edit Info</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={ tailwind(`absolute right-5 top-16`) }>
                        <Pressable 
                            style={({ pressed }) => [
                                { 
                                    opacity: pressed ? 0.5 : 1,
                                    top: -50
                                }
                            ]}
                            onPress={() => {
                                if(!isShowing) {
                                    setIsShowing(true)
                                    playerHeight.value = 0 + statusBarHeight
                                } else {
                                    setIsShowing(false)
                                    playerHeight.value = windowHeight + 65
                                }
                            }}
                        >
                            <MaterialCommunityIcons name="close" size={32} color="black" />
                        </Pressable>
                    </View>
                </View>
                <View style={ tailwind(`h-5/6`) }>
                    <View style={ tailwind(`border-b w-full p-5`) }>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                tailwind(`flex-row`)
                            ]}
                            onPress={() => navigation.navigate('FavoritesScreen')}
                        >
                            <View style={ tailwind(`w-2/12`) }>
                                <MaterialCommunityIcons name="heart-multiple" size={24} color="black" />
                            </View>
                            <View style={ tailwind(`w-10/12 justify-center`) }>
                                <Text style={ tailwind(`font-bold`) }>Favorites</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={ tailwind(`border-b w-full p-5`) }>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                tailwind(`flex-row`)
                            ]}
                        >
                            <View style={ tailwind(`w-2/12`) }>
                                <MaterialIcons name="settings" size={24} color="black" />
                            </View>
                            <View style={ tailwind(`w-10/12 justify-center`) }>
                                <Text style={ tailwind(`font-bold`) }>Settings</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={ tailwind(`border-b w-full p-5`) }>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                tailwind(`flex-row`)
                            ]}
                        >
                            <View style={ tailwind(`w-2/12`) }>
                                <MaterialCommunityIcons name="help-circle" size={24} color="black" />
                            </View>
                            <View style={ tailwind(`w-10/12 justify-center`) }>
                                <Text style={ tailwind(`font-bold`) }>Help</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={ tailwind(`border-b w-full p-5`) }>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                tailwind(`flex-row`)
                            ]}
                            onPress={() => signOut()}
                        >
                            <View style={ tailwind(`w-2/12`) }>
                                <MaterialCommunityIcons name="logout" size={24} color="black" />
                            </View>
                            <View style={ tailwind(`w-10/12 justify-center`) }>
                                <Text style={ tailwind(`font-bold`) }>Logout</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}

export default UserButton

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
