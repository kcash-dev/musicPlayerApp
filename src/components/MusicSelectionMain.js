import React from 'react'
import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tailwind from 'tailwind-rn'
import { useSelector } from 'react-redux'

//Components
import AlbumsList from './AlbumsList'

const MusicSelectionMain = () => {
    const navigation = useNavigation()
    const artists = useSelector(state => state.library)
    console.log(artists, "ARTISTS")
    return (
        <View style={ tailwind(`h-full w-full`) }>
            <FlatList 
                data={ artists }
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.7 : 1 },

                        ]}
                    >
                        <Image 
                            source={{ uri: item.artistPicture }}
                            style={{ height: '100%', width: '100%' }}
                            resizeMode='contain'
                        />
                        <Text>{ item.artistName }</Text>
                    </Pressable>
                )}
                contentContainerStyle={ tailwind(`w-full h-full`) }
                
            />
        </View>
    )
}

export default MusicSelectionMain

const styles = StyleSheet.create({})
