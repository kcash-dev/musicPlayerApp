import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

const ArtistPressableSelection = ({ item, artistName, navigationScreen, artistPicture }) => {
    const navigation = useNavigation()
    return (
        <Pressable
            style={({ pressed }) => [
                { 
                    opacity: pressed ? 0.7 : 1
                },
                tailwind(`w-36 h-36 my-3`)
            ]}
            onPress={() => navigation.navigate(navigationScreen, { item: item, artistName: artistName })}
        >
            <View style={[ styles.shadow, tailwind(`h-full`) ]}>
                <Image 
                    source={{ uri: artistPicture }}
                    style={[{ height: '100%', width: '100%' }, tailwind(`rounded-lg`) ]}
                    resizeMode='cover'
                />
            </View>
            { artistName ? 
                <View style={ tailwind(`justify-center mt-3`) }>
                    <Text style={ tailwind(`text-xs`) }>{ artistName }</Text>
                </View>
                :
                null
            }
        </Pressable>
    )
}

export default ArtistPressableSelection

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
