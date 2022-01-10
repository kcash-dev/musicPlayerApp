import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'

//Components
import AlbumPressableSelection from './AlbumPressableSelection'

const OtherArtistAlbums = ({ item }) => {
    const library = useSelector(state => state.library)
    const foundArtist = library.filter(artist => {
        return artist.artistName === item.albumArtist
    })

    const otherAlbums = foundArtist[0].albums.filter(album => {
        return album.albumName !== item.albumName
    })

    return (
        <FlatList
            data={ otherAlbums }
            renderItem={({ item }) => (
                <AlbumPressableSelection 
                    item={ item } 
                    artistName={ item.albumArtist } 
                    albumArt={ item.albumArt } 
                    albumName={ item.albumName }
                    navigationScreen="AlbumScreen"
                />
            )}
            horizontal
            contentContainerStyle={ tailwind(`pb-10`) }
            style={ tailwind(`pb-14`) }
        />
    )
}

export default OtherArtistAlbums

const styles = StyleSheet.create({})
