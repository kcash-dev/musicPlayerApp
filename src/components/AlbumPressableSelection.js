import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

const AlbumPressableSelection = ({ item, artistName, navigationScreen, artistPicture, albumArt, albumName }) => {
    const navigation = useNavigation()
    return (
        <Pressable
            style={({ pressed }) => [
                { 
                    opacity: pressed ? 0.7 : 1
                },
                tailwind(`w-24 h-28`)
            ]}
            onPress={() => navigation.navigate(navigationScreen, { item: item, artistName: artistName })}
        >
            <View style={[ styles.shadow, tailwind(`h-full`) ]}>
                { albumArt ? 
                    <Image 
                        source={{ uri: albumArt }}
                        style={[{ height: '90%', width: '100%' }, tailwind(`rounded-lg`) ]}
                        resizeMode='cover'
                    />
                    :
                    <Image 
                    source={{ uri: artistPicture }}
                    style={[{ height: '90%', width: '100%' }, tailwind(`rounded-lg`) ]}
                    resizeMode='cover'
                />
                }
            </View>
            { albumName ? 
                <View style={ tailwind(`justify-center`) }>
                    <Text style={ tailwind(`text-xs font-bold`) }>{ albumName }</Text>
                    <Text style={ tailwind(`text-xs`) }>Album · { artistName }</Text>
                </View>
                :
                null
            }
        </Pressable>
    )
}

export default AlbumPressableSelection

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
