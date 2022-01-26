import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const AlbumMenu = ({ artist }) => {
    return (
        <View style={[ tailwind(`absolute w-full bottom-0 items-center`), styles.shadow, { zIndex: 1 } ]}>
            <Pressable 
                style={({ pressed }) => [
                    { 
                        opacity: pressed ? 0.5 : 1,
                    },
                    tailwind(`border-b w-full items-center bg-white bg-opacity-100 py-5 flex-row`)
                ]} 
            >
                <View style={ tailwind(`w-2/12 px-2`) }>
                    <MaterialIcons name="next-plan" size={35} color="black" />
                </View>
                <View style={ tailwind(`w-10/12`) }>
                    <Text style={ tailwind(`text-lg font-bold text-center`) }>Play next</Text>
                </View>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    tailwind(`border-b w-full items-center bg-white bg-opacity-100 py-5 flex-row`)
                ]} 
            >
                <View style={ tailwind(`w-2/12 px-3`) }>
                    <MaterialIcons name="playlist-add" size={35} color="black" />
                </View>
                <View style={ tailwind(`w-10/12`) }>
                    <Text style={ tailwind(`text-lg font-bold text-center`) }>Add to playlist</Text>
                </View>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    tailwind(`border-b w-full items-center bg-white bg-opacity-100 py-5 flex-row`)
                ]} 
            >
                <View style={ tailwind(`w-2/12 px-2`) }>
                    <MaterialCommunityIcons name="heart-plus" size={35} color="black" />
                </View>
                <View style={ tailwind(`w-10/12`) }>
                    <Text style={ tailwind(`text-lg font-bold text-center`) }>Add to favorites</Text>
                </View>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    tailwind(`border-b w-full items-center bg-white bg-opacity-100 py-5 flex-row`)
                ]} 
            >
                <Image 
                    source={{ uri: artist }}
                    style={{ height: '130%', width: '9%', borderRadius: 100, marginHorizontal: 10 }}
                />
                <View style={ tailwind(`w-10/12`) }>
                    <Text style={ tailwind(`text-lg font-bold text-center`) }>Go to artist</Text>
                </View>
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
