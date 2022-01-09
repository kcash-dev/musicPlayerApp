import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

const AlbumPressable = ({ item, artistName }) => {
    const navigation = useNavigation()
    return (
        <Pressable
            style={({ pressed }) => [
                { 
                    opacity: pressed ? 0.7 : 1
                },
                tailwind(`w-1/2 self-center`)
            ]}
            onPress={() => navigation.navigate('AlbumScreen', { item: item, artistName: artistName })}
        >
            <View style={[ styles.shadow, tailwind(`h-full`) ]}>
                <Image 
                    source={{ uri: item.albumArt }}
                    style={[{ height: '90%', width: '100%' }, tailwind(`rounded-lg`) ]}
                    resizeMode='cover'
                />
            </View>
            <View style={ tailwind(`justify-center`) }>
                <Text style={ tailwind(`text-xs font-bold`) }>{ item.albumName }</Text>
                <Text style={ tailwind(`text-xs`) }>Album · { artistName }</Text>
            </View>
        </Pressable>
    )
}

export default AlbumPressable

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
