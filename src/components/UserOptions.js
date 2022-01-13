import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import tailwind from 'tailwind-rn';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const UserOptions = () => {
    const playerHeight = useSharedValue(windowHeight - 65)

    const playerBarStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(playerHeight.value, playerConfig) }]
        }
    })

    return (
        <View style={[ tailwind(`absolute`), { width: windowWidth, height: windowHeight, zIndex: 1 }, playerBarStyles  ]}>

        </View>
    )
}

export default UserOptions

const styles = StyleSheet.create({})
