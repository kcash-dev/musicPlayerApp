import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import tailwind from 'tailwind-rn'
import { useSelector } from 'react-redux'
import AlbumCarousel from './AlbumCarousel'

const MusicSelectionMain = () => {
    const artists = useSelector(state => state.library)
    const albums = []

    const getAlbums = () => {
        for (let i = 0; i < artists.length; i++) {
            for(let j = 0; j < artists[i].albums.length; j++) {
                albums.push(artists[i].albums[j])
            }
        }
    }

    getAlbums()

    return (
        <View style={ tailwind(`h-full w-full flex-1`) }>
            <Text style={ tailwind(`text-2xl font-bold px-3 py-2`) }>Quick Picks</Text>
            <AlbumCarousel 
                item={ albums }
            />
        </View>
    )
}

export default MusicSelectionMain

const styles = StyleSheet.create({})
