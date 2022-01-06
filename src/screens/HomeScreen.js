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


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const HomeScreen = () => {
    const barWidth = useSharedValue(0)
    const playerHeight = useSharedValue(windowHeight - 65)
    const imagePositionY = useSharedValue(0)
    const imagePositionX = useSharedValue(0)
    const imageHeight = useSharedValue(50)
    const imageWidth = useSharedValue(50)
    const songTitlePositionY = useSharedValue(0)
    const songTitlePositionX = useSharedValue(0)
    const songTitleWidth = useSharedValue(windowWidth * .5)
    const songTitleFontSize = useSharedValue(16)
    const authorNamePositionY = useSharedValue(0)
    const authorNamePositionX = useSharedValue(0)
    const authorFontSize = useSharedValue(12)
    const controlButtonsPositionY = useSharedValue(0)
    const controlButtonsPositionX = useSharedValue(0)
    const playButtonSize = useSharedValue(18)


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
            ]
        }
    })

    const playButtonTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            height: withTiming(playButtonSize.value, transitionConfig)
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
            {/* <Pressable
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.7 : 1,
                        height: '10%'
                    },
                    tailwind(`absolute bottom-0 w-full bg-white rounded-t-lg flex-row items-center justify-evenly`),
                    styles.shadow
                ]}
                onPress={() => {
                    playerHeight.value = 0 + statusBarHeight
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
            </Pressable> */}
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
                            imagePositionY.value = windowHeight * .35
                            imagePositionX.value = windowWidth * .16
                            imageWidth.value = 250
                            imageHeight.value = 250
                            songTitlePositionY.value = windowHeight * .60
                            songTitlePositionX.value = windowWidth * .009
                            songTitleWidth.value = windowWidth
                            songTitleFontSize.value = 24
                            authorFontSize.value = 16
                            authorNamePositionX.value = windowWidth * .25
                            controlButtonsPositionY.value = windowHeight * .75
                            controlButtonsPositionX.value = windowWidth * -.25
                            playButtonSize.value = 32
                        } else {
                            setIsShowing(false)
                            playerHeight.value = windowHeight - 65
                            imagePositionY.value = 0
                            imagePositionX.value = 0
                            imageHeight.value = 50
                            imageWidth.value = 50
                            songTitlePositionY.value = 0
                            songTitlePositionX.value = 0
                            songTitleFontSize.value = 16
                            songTitleWidth.value = windowWidth
                            authorFontSize.value = 12
                            authorNamePositionX.value = 0
                            controlButtonsPositionY.value = 0
                            controlButtonsPositionX.value = 0
                            playButtonSize.value = 18
                        }
                    }}
                >
                    <Animated.View style={[ tailwind(`w-1/6 h-full absolute left-1 rounded-lg`), { overflow: 'hidden' }, imageTransitionAnimatedStyles ]}>
                        <Animated.Image 
                            source={{ uri: 'https://i.imgur.com/FEMO9iT.jpg' }}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode='contain'
                        />
                    </Animated.View>
                    <Animated.View style={[ tailwind(`w-3/6 px-3 absolute left-12`), songTitleContainerTransitionAnimatedStyles ]}>
                        <Animated.Text style={[ tailwind(`font-bold`), songTitleTransitionAnimatedStyles ]}>Eulogy for a Rock Band</Animated.Text>
                        <Animated.Text style={[ tailwind(`text-sm`), authorNameTransitionAnimatedStyles ]}>Weezer</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[ tailwind(`flex-row items-center justify-evenly w-2/6 absolute right-3`), controlButtonTransitionAnimatedStyles ]}>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 }
                            ]}
                            onPress={() => setIsPlaying(!isPlaying)}
                        >
                            { isPlaying ? 
                                <MaterialIcons name="pause-circle-filled" size={32} color="black" />
                                :
                                <MaterialIcons name="play-circle-filled" size={ 32 } color="black" />
                            }
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 }
                            ]}
                        >
                            <MaterialIcons name="skip-next" size={24} color="black" />
                        </Pressable>
                    </Animated.View>
                </Pressable>
                { isShowing ? 
                    <View style={ tailwind(`self-center my-3`) }>
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
