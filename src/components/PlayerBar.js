import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions, StatusBar, Platform } from 'react-native'
import tailwind from 'tailwind-rn';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AudioControls from '../components/AudioControls';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const PlayerBar = ({

}) => {
    const barWidth = useSharedValue(0)
    const playerHeight = useSharedValue(windowHeight - 65)
    const imagePositionY = useSharedValue(windowHeight * -.045)
    const imagePositionX = useSharedValue(0)
    const imageHeight = useSharedValue(50)
    const imageWidth = useSharedValue(50)
    const songTitlePositionY = useSharedValue(windowHeight * -.045)
    const songTitlePositionX = useSharedValue(0)
    const songTitleAlignment = useSharedValue('')
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

    const [ isShowing, setIsShowing ] = useState(false)
    const [ statusBarHeight, setStatusBarHeight ] = useState();

    const currentSong = useSelector(state => state.currentSong)


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
            width: withTiming(songTitleWidth.value, transitionConfig),
            alignItems: withTiming(songTitleAlignment.value)
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
        <Animated.View style={[ tailwind(`bg-gray-100 absolute w-full`), playerBarStyles, { height: windowHeight, zIndex: 1  } ]}>
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
                        songTitlePositionX.value = windowWidth * .095
                        songTitleWidth.value = windowWidth
                        songTitleFontSize.value = 24
                        authorFontSize.value = 16
                        authorNamePositionX.value = windowWidth * .185
                        controlButtonsPositionY.value = windowHeight * .70
                        controlButtonsPositionX.value = windowWidth * .04
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
                    playButtonMargin={ playButtonMargin.value }
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
    )
}

export default PlayerBar

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
