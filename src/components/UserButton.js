import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const UserButton = () => {
    const [ isShowing, setIsShowing ] = useState(false)
    const [ statusBarHeight, setStatusBarHeight ] = useState();
    const playerHeight = useSharedValue(windowHeight - 65)

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

    return (
        <View style={[ tailwind(`absolute top-8 right-3 self-center flex-row items-center bg-gray-100 rounded-full p-1`), styles.shadow ]}>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 }
                ]}
                onPress={() => {
                    if(!isShowing) {
                        setIsShowing(true)
                        playerHeight.value = 0 + statusBarHeight
                    } else {
                        setIsShowing(false)
                        playerHeight.value = windowHeight - 65
                    }
                }}
            >
                <MaterialCommunityIcons name="account" size={32} color="gray" />
            </Pressable>
            <Animated.View style={[ tailwind(`absolute bg-white`), { width: windowWidth, height: windowHeight, zIndex: 1, right: '-50%', top: '-75%' }, playerBarStyles  ]}>
                <View style={ tailwind(`flex-row bg-white`) }>
                    <View style={[ tailwind(`justify-center items-center bg-gray-100 rounded-full p-1 w-1/5 mx-3`), styles.shadow, { zIndex: 1 } ]}>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 }
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
                            <MaterialCommunityIcons name="account" size={64} color="gray" />
                        </Pressable>
                    </View>
                    <Text>This is the user options</Text>
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
