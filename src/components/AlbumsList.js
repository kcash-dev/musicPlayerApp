import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

const AlbumsList = ({ item }) => {
    const [ artistName, setArtistName ] = useState(item.artistName)
    const [ genre, setGenre ] = useState(item.genre)
    return (
        <FlatList 
            data={ item.albums }
            renderItem={({ item }) => (
                <Pressable 
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 },
                        tailwind(`w-2/3 h-1/3 self-center rounded-lg`)
                    ]}
                    onPress={() => navigation.navigate('AlbumScreen', { tracks: item.tracks, albumArt: item.albumArt, albumName: item.albumName, artist: artistName, genre: genre })}
                >
                    <Image 
                        source={{ uri: item.albumArt }}
                        style={[ { width: '100%', height: '100%' }, tailwind(`rounded-lg`) ]}
                        resizeMode='contain'
                    />
                </Pressable>
            )}
        />
    )
}

export default AlbumsList

const styles = StyleSheet.create({})
