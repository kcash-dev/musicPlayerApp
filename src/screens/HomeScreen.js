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


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const HomeScreen = () => {
    const barWidth = useSharedValue(0)
    const playerHeight = useSharedValue(windowHeight - 65)
    const imagePositionY = useSharedValue(windowHeight * -.045)
    const imagePositionX = useSharedValue(0)
    const imageHeight = useSharedValue(50)
    const imageWidth = useSharedValue(50)
    const songTitlePositionY = useSharedValue(windowHeight * -.045)
    const songTitlePositionX = useSharedValue(0)
    const songTitleWidth = useSharedValue(windowWidth * .55)
    const songTitleFontSize = useSharedValue(16)
    const authorNamePositionX = useSharedValue(0)
    const authorFontSize = useSharedValue(12)
    const controlButtonsPositionY = useSharedValue(windowHeight * -.033)
    const controlButtonsPositionX = useSharedValue(0)
    const playButtonSize = useSharedValue(32)
    const nextButtonSize = useSharedValue(24)
    const playButtonMargin = useSharedValue(0)
    const controlButtonContainerWidth = useSharedValue(windowWidth * .33)


    const [ expanded, setExpanded ] = useState(false)
    const [ isShowing, setIsShowing ] = useState(false)
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ statusBarHeight, setStatusBarHeight ] = useState();


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

    const playerConfig = {
        duration: 200
    }

    const transitionConfig = {
        duration: 200
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

    const imageTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withTiming(imagePositionY.value, transitionConfig) },
                { translateX: withTiming(imagePositionX.value, transitionConfig) }
            ],
            width: withTiming(imageWidth.value, transitionConfig),
            height: withTiming(imageHeight.value, transitionConfig)
        }
    })

    const songTitleContainerTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withTiming(songTitlePositionY.value, transitionConfig) },
                { translateX: withTiming(songTitlePositionX.value, transitionConfig) }
            ],
            width: withTiming(songTitleWidth.value, transitionConfig)
        }
    })

    const songTitleTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            fontSize: withTiming(songTitleFontSize.value, transitionConfig)
        }
    })

    const authorNameTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: withTiming(authorNamePositionX.value, transitionConfig) },
            ],
            fontSize: withTiming(authorFontSize.value, transitionConfig)
        }
    })

    const controlButtonTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withTiming(controlButtonsPositionY.value, transitionConfig) },
                { translateX: withTiming(controlButtonsPositionX.value, transitionConfig) }
            ],
            width: withTiming(controlButtonContainerWidth.value, transitionConfig)
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
            <View style={ tailwind(`w-2/3 h-1/3 self-center rounded-lg`) }>
                <Image 
                    source={{ uri: 'https://i.imgur.com/FEMO9iT.jpg' }}
                    style={[ { width: '100%', height: '100%' }, tailwind(`rounded-lg`) ]}
                    resizeMode='contain'
                />
            </View>
            <Animated.View style={[ tailwind(`bg-gray-100 absolute w-full`), playerBarStyles, { height: windowHeight  } ]}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.7 : 1,
                            height: '10%'
                        },
                        tailwind(`w-full bg-white rounded-t-lg w-full flex-row items-center justify-evenly`),
                        styles.shadow
                    ]}
                    onPress={() => {
                        if(!isShowing) {
                            setIsShowing(true)
                            playerHeight.value = 0 + statusBarHeight
                            imagePositionY.value = windowHeight * .1
                            imagePositionX.value = windowWidth * .17
                            imageWidth.value = 250
                            imageHeight.value = 250
                            songTitlePositionY.value = windowHeight * .55
                            songTitlePositionX.value = windowWidth * .009
                            songTitleWidth.value = windowWidth
                            songTitleFontSize.value = 24
                            authorFontSize.value = 16
                            authorNamePositionX.value = windowWidth * .25
                            controlButtonsPositionY.value = windowHeight * .70
                            controlButtonsPositionX.value = windowWidth * .025
                            playButtonSize.value = 64
                            nextButtonSize.value = 32
                            controlButtonContainerWidth.value = windowWidth
                        } else {
                            setIsShowing(false)
                            playerHeight.value = windowHeight - 65
                            imagePositionY.value = windowHeight * -.045
                            imagePositionX.value = 0
                            imageHeight.value = 50
                            imageWidth.value = 50
                            songTitlePositionY.value = windowHeight * -.045
                            songTitlePositionX.value = 0
                            songTitleFontSize.value = 16
                            songTitleWidth.value = windowWidth
                            authorFontSize.value = 12
                            authorNamePositionX.value = 0
                            controlButtonsPositionY.value = windowHeight * -.027
                            controlButtonsPositionX.value = 0
                            playButtonSize.value = 32
                            nextButtonSize.value = 24
                            controlButtonContainerWidth.value = windowWidth * .33
                        }
                    }}
                >
                    <AudioControls
                        imageTransition={ imageTransitionAnimatedStyles }
                        songTitleContainerTransition={ songTitleContainerTransitionAnimatedStyles }
                        songTitleTransition={ songTitleTransitionAnimatedStyles }
                        authorNameTransition={ authorNameTransitionAnimatedStyles }
                        controlButtonTransition={ controlButtonTransitionAnimatedStyles }
                        playButtonSize={ playButtonSize.value }
                        nextButtonSize={ nextButtonSize.value }
                        isShowing={ isShowing }
                        isPlaying={ isPlaying }
                        playButtonMargin={ playButtonMargin.value }
                        setIsPlaying={ setIsPlaying }
                    />
                </Pressable>
                { isShowing ? 
                    <View style={[ tailwind(`absolute`), { right: '32%', top: '2%' } ]}>
                        <Text style={ tailwind(`text-2xl font-bold`) }>Now Playing</Text>
                    </View>
                    :
                    null
                }
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
