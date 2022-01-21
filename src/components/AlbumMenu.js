import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
const AlbumMenu = () => {
    return (
        <View style={[ tailwind(`absolute right-5 top-8 w-1/3 items-center bg-white`), styles.shadow, { zIndex: 1 } ]}>
            <Pressable 
                style={({ pressed }) => [
                    { 
                        opacity: pressed ? 0.5 : 1,
                    },
                    tailwind(`border-b w-full items-center bg-white bg-opacity-100`)
                ]} 
            >
                <Text style={ tailwind(``) }>Menu Item #1</Text>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    tailwind(`border-b w-full items-center bg-white bg-opacity-100`)
                ]} 
            >
                <Text style={ tailwind(``) }>Menu Item #2</Text>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    tailwind(`border-b w-full items-center bg-white bg-opacity-100`)
                ]} 
            >
                <Text style={ tailwind(``) }>Menu Item #3</Text>
            </Pressable>
        </View>
    )
}

export default AlbumMenu

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
