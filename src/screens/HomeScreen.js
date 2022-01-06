import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TextInput, Dimensions } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height

const HomeScreen = () => {
    const barWidth = useSharedValue(0)
    const playerHeight = useSharedValue(windowHeight + 2)
    const [ expanded, setExpanded ] = useState(false)

    const searchConfig = {
        duration: 500
    }

    const playerConfig = {
        duration: 700
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(barWidth.value, searchConfig)
        }
    })

    const playerBarStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(playerHeight.value, playerConfig) }]
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
                    onPress={() => {

                    }}
                >
                    <MaterialIcons name="person" size={32} color="gray" />
                </Pressable>
            </View>
            <View style={ tailwind(`mt-14`) }>
                <Text style={ tailwind(`text-3xl font-bold text-center`) }>Listen Now</Text>
            </View>
            <View style={ tailwind(`w-2/3 h-1/3 self-center rounded-lg`) }>
                <Image 
                    source={{ uri: 'https://i.imgur.com/FEMO9iT.jpg' }}
                    style={[ { width: '100%', height: '100%' }, tailwind(`rounded-lg`) ]}
                    resizeMode='contain'
                />
            </View>
            <Pressable
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.7 : 1,
                        height: '10%'
                    },
                    tailwind(`absolute bottom-0 w-full bg-green-500 rounded-t-lg flex-row items-center justify-evenly`)
                ]}
                onPress={() => {
                    playerHeight.value = 0
                }}
            >
                <View style={[ tailwind(`w-1/6`), { overflow: 'hidden' } ]}>
                    <Image 
                        source={{ uri: 'https://i.imgur.com/FEMO9iT.jpg' }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='contain'
                    />
                </View>
                <View style={ tailwind(`w-3/6 pl-3`) }>
                    <Text style={ tailwind(`font-bold`) }>Eulogy for a Rock Band</Text>
                    <Text style={ tailwind(`text-sm`) }>Weezer</Text>
                </View>
                <View style={ tailwind(`flex-row items-center justify-evenly w-2/6`) }>
                    <MaterialIcons name="play-circle-filled" size={36} color="black" />
                    <MaterialIcons name="skip-next" size={24} color="black" />
                </View>
            </Pressable>
            <Animated.View style={[ tailwind(`bg-red-500 absolute w-full`), playerBarStyles, { height: windowHeight } ]}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.7 : 1,
                            height: '10%'
                        },
                        tailwind(`w-full bg-green-500 rounded-t-lg w-full flex-row items-center justify-evenly`)
                    ]}
                    onPress={() => {
                        playerHeight.value = windowHeight + 2
                    }}
                >
                    <View style={[ tailwind(`w-1/6`), { overflow: 'hidden' } ]}>
                        <Image 
                            source={{ uri: 'https://i.imgur.com/FEMO9iT.jpg' }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={ tailwind(`w-3/6 px-3`) }>
                        <Text style={ tailwind(`font-bold`) }>Eulogy for a Rock Band</Text>
                        <Text style={ tailwind(`text-sm`) }>Weezer</Text>
                    </View>
                    <View style={ tailwind(`flex-row items-center justify-evenly w-2/6`) }>
                        <MaterialIcons name="play-circle-filled" size={36} color="black" />
                        <MaterialIcons name="skip-next" size={24} color="black" />
                    </View>
                </Pressable>
            </Animated.View>
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
