import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import { useSelector } from 'react-redux'
import AlbumCarousel from './AlbumCarousel'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const MusicSelectionMain = () => {
    const [ rapAlbums, setRapAlbums ] = useState()
    const [ rockAlbums, setRockAlbums ] = useState()
    const artists = useSelector(state => state.library)
    const albums = []

    const getAlbums = () => {
        for (let i = 0; i < artists.length; i++) {
            for(let j = 0; j < artists[i].albums.length; j++) {
                albums.push(artists[i].albums[j])
            }
        }
    }

    const separateGenres = () => {
        const rap = []
        const rock = []
        for(let i = 0; i < albums.length; i++) {
            if(albums[i].genre === "Rock") {
                rock.push(albums[i])
            } else if (albums[i].genre === "Rap") {
                rap.push(albums[i])
            }
        }
        setRapAlbums(rap)
        setRockAlbums(rock)
    }

    useEffect(() => {
        separateGenres()
    }, [])

    getAlbums()

    return (
        <View style={ tailwind(`flex-1`) }>
            <ScrollView style={{ flex: 1 }}>
                <View style={ tailwind(`h-full w-full`) }>
                    <Text style={ tailwind(`text-2xl font-bold px-3 py-2`) }>Quick Picks</Text>
                    <AlbumCarousel 
                        item={ albums }
                    />
                </View>
                <View style={ tailwind(`h-full w-full`) }>
                    <Text style={ tailwind(`text-2xl font-bold px-3 py-2`) }>Rap</Text>
                    <AlbumCarousel 
                        item={ rapAlbums }
                    />
                </View>
                <View style={ tailwind(`h-full w-full`) }>
                    <Text style={ tailwind(`text-2xl font-bold px-3 py-2`) }>Rock</Text>
                    <AlbumCarousel 
                        item={ rockAlbums }
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default MusicSelectionMain

const styles = StyleSheet.create({})
