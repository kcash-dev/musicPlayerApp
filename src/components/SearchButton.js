import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TextInput, Dimensions, StatusBar, Platform } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

const SearchButton = () => {
    const [ expanded, setExpanded ] = useState(false)
    const barWidth = useSharedValue(0)

    const searchConfig = {
        duration: 700
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(barWidth.value, searchConfig)
        }
    })


    return (
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
    )
}

export default SearchButton

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
