import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TextInput, Dimensions, StatusBar, Platform } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AudioControls from '../components/AudioControls';
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';

//Components
import PlayerBar from '../components/PlayerBar';


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const HomeScreen = () => {
    const barWidth = useSharedValue(0)


    const [ expanded, setExpanded ] = useState(false)
    const [ statusBarHeight, setStatusBarHeight ] = useState();

    const navigation = useNavigation();


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

    const searchConfig = {
        duration: 700
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(barWidth.value, searchConfig)
        }
    })

    return (
        <SafeAreaView style={ tailwind(`flex-1 bg-white h-full`) }>
            <View style={[ tailwind(`absolute top-8 left-3 self-center flex-row items-center bg-gray-100 rounded-full p-1`), styles.shadow ]}>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 },
                        tailwind(``)
                    ]}
                    onPress={() => {
                        if (!expanded) {
                            setExpanded(true)
                            barWidth.value = 250
                        } else {
                            setExpanded(false)
                            barWidth.value = 0
                        }
                    }}
                >
                    <MaterialIcons name="search" size={32} color="gray" />
                </Pressable>
                <Animated.View
                    style={[ tailwind(``), animatedStyles ]}
                >
                        <TextInput 
                            placeholder='Search'
                        />
                </Animated.View>
            </View>
            <View style={[ tailwind(`absolute top-8 right-3 self-center flex-row items-center bg-gray-100 rounded-full p-1`), styles.shadow ]}>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 },
                        tailwind(``)
                    ]}
                >
                    <MaterialIcons name="person" size={32} color="gray" />
                </Pressable>
            </View>
            <View style={ tailwind(`mt-14`) }>
                <Text style={ tailwind(`text-3xl font-bold text-center`) }>Listen Now</Text>
            </View>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.7 : 1 },
                    tailwind(`w-2/3 h-1/3 self-center rounded-lg`)
                ]}
                onPress={() => navigation.navigate('AlbumScreen')}
            >
                <Image 
                    source={{ uri: 'https://i.imgur.com/FEMO9iT.jpg' }}
                    style={[ { width: '100%', height: '100%' }, tailwind(`rounded-lg`) ]}
                    resizeMode='contain'
                />
            </Pressable>
            <PlayerBar />
        </SafeAreaView>
    )
}

export default HomeScreen

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
