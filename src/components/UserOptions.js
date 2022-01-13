import React from 'react'
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import tailwind from 'tailwind-rn';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const UserOptions = () => {
    const playerHeight = useSharedValue(windowHeight - 65)

    const playerBarStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(playerHeight.value, transitionConfig) }]
        }
    })

    const transitionConfig = {
        duration: 200
    }

    return (
        <Animated.View style={[ tailwind(`absolute bg-gray-100 bg-opacity-100`), { width: windowWidth, height: windowHeight, zIndex: 1, right: '-50%', top: '-75%' }, playerBarStyles  ]}>
            <View style={ tailwind(`flex-row bg-white`) }>
                <View style={[ tailwind(`justify-center items-center bg-gray-100 rounded-full p-1 w-1/5 mx-3`), styles.shadow, { zIndex: 1 } ]}>
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.5 : 1 }
                        ]}
                    >
                        <MaterialCommunityIcons name="account" size={64} color="gray" />
                    </Pressable>
                </View>
                <Text>This is the user options</Text>
            </View>
            <View>
                <Pressable 
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 },
                        tailwind(`absolute -top-20 right-3`)
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
                    <MaterialCommunityIcons name="close" size={24} color="black" />
                </Pressable>
            </View>
        </Animated.View>
    )
}

export default UserOptions

const styles = StyleSheet.create({})
