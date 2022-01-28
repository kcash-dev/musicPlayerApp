import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions, StatusBar, Platform, FlatList } from 'react-native'
import tailwind from 'tailwind-rn';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';

//Components
import PlaylistSelection from '../components/PlaylistSelection'
import AudioControls from '../components/AudioControls';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const PlayerBar = () => {
    const barWidth = useSharedValue(0)
    const playerHeight = useSharedValue(windowHeight - 65)
    const imagePositionY = useSharedValue(windowHeight * -.045)
    const imagePositionX = useSharedValue(0)
    const imageHeight = useSharedValue(50)
    const imageWidth = useSharedValue(50)
    const songTitlePositionY = useSharedValue(windowHeight * -.045)
    const songTitlePositionX = useSharedValue(0)
    const songTitleAlignment = useSharedValue('')
    const songTitleWidth = useSharedValue(windowWidth)
    const songTitleFontSize = useSharedValue(16)
    const authorNamePositionX = useSharedValue(0)
    const authorFontSize = useSharedValue(12)
    const controlButtonsPositionY = useSharedValue(windowHeight * -.033)
    const controlButtonsPositionX = useSharedValue(0)
    const playButtonSize = useSharedValue(32)
    const nextButtonSize = useSharedValue(24)
    const playButtonMargin = useSharedValue(0)
    const controlButtonContainerWidth = useSharedValue(windowWidth * .33)
    const playListPosition = useSharedValue(windowHeight)
    const selectedPosition = useSharedValue(windowWidth * -.015)

    const [ isShowing, setIsShowing ] = useState(false)
    const [ statusBarHeight, setStatusBarHeight ] = useState();
    const [ nowPlayingSelected, setNowPlayingSelected ] = useState(true)

    const { currentSong, playlist } = useSelector(state => state)


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
        removeCurrentSongFromPlaylist()
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

    const playlistTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withTiming(playListPosition.value, transitionConfig) }
            ]
        }
    })

    const selectedTransitionAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: withTiming(selectedPosition.value, transitionConfig) }
            ]
        }
    })

    const removeCurrentSongFromPlaylist = () => {
        for (let i = 0; i < playlist.length; i++) {
            if(playlist[i].id === currentSong.id) {
                playlist.splice(i, 1)
            }
        }
    }

    const toFindDuplicates = (array) => array.filter(item => item.trackName !== currentSong.trackName) 
    const fixedPlaylist = toFindDuplicates(playlist)

    return (
        <Animated.View style={[ tailwind(`bg-white absolute w-full`), playerBarStyles, { height: windowHeight, zIndex: 1  } ]}>
            <Pressable
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.7 : 1,
                        height: '10%',
                        display: nowPlayingSelected ? 'flex' : 'none'
                    },
                    tailwind(`w-full bg-white rounded-t-lg flex-row items-center justify-evenly`),
                    styles.shadow,
                ]}
                onPress={() => {
                    if(!isShowing) {
                        setIsShowing(true)
                        playerHeight.value = 0 + statusBarHeight
                        imagePositionY.value = windowHeight * .1
                        imagePositionX.value = windowWidth * .17
                        imageWidth.value = 250
                        imageHeight.value = 250
                        songTitlePositionY.value = windowHeight * .50
                        songTitlePositionX.value = '50%'
                        songTitleFontSize.value = 24
                        songTitleWidth.value = '100%'
                        authorFontSize.value = 16
                        authorNamePositionX.value = '50%'
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
                <View style={[ tailwind(`absolute flex-row w-full justify-evenly bg-white`), { top: '5%', left: '-5%' } ]}>
                    <View>
                        <Pressable 
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                tailwind(``),
                            ]}
                            onPress={() => {
                                selectedPosition.value = windowWidth * -.015
                                setNowPlayingSelected(true)
                                playListPosition.value = windowHeight
                            }}
                        >
                            <Text style={ tailwind(`text-xl font-bold text-opacity-100`) }>Now Playing</Text>
                        </Pressable>
                    </View>
                    <View style={ tailwind(`border-l h-full`) }/>
                    <View>
                        <Pressable 
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                tailwind(``),
                            ]}
                            onPress={() => {
                                selectedPosition.value = windowWidth * .51
                                setNowPlayingSelected(false)
                                playListPosition.value = 0
                            }}
                        >
                            <Text style={ tailwind(`text-xl font-bold text-opacity-100`) }>Up next</Text>
                        </Pressable>
                    </View>
                    <Animated.View
                        style={[ 
                            nowPlayingSelected ? tailwind(`py-4 px-16 rounded-lg absolute bg-gray-400 bg-opacity-50`) : tailwind(`py-4 px-14 absolute rounded-lg bg-gray-400 bg-opacity-50`),
                            selectedTransitionAnimatedStyles,
                            { zIndex: -1 }
                        ]}
                    />
                    <Animated.View style={[ 
                        tailwind(`bg-white rounded-t-lg absolute top-10 left-5 w-full`), 
                        {
                            height: windowHeight
                        }, 
                        styles.shadow,
                        playlistTransitionAnimatedStyles
                    ]}>
                        <FlatList 
                            data={ fixedPlaylist }
                            keyExtractor={item => item.trackName}
                            renderItem={({ item }) => (
                                <PlaylistSelection item={ item }/>
                            )}
                        />
                    </Animated.View>
                </View> 
                :
                null
            }
        </Animated.View>
    )
}

export default React.memo(PlayerBar)

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
    },
    selected: {
        backgroundColor: 'rgba(163, 165, 166, 0.3)',
    }
})
