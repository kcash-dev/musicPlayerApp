import React, { useMemo } from 'react'
import { StyleSheet, View, Dimensions, FlatList } from 'react-native'
import tailwind from 'tailwind-rn'

//Components
import PressableSelection from './PressableSelection'

const AlbumCarousel = ({ item }) => {
    return (
        <View style={ tailwind(`flex-1`) }>
            <FlatList 
                data={ item }
                renderItem={({ item }) => (
                    <PressableSelection 
                        item={ item } 
                        artistName={ item.albumArtist } 
                        albumArt={ item.albumArt } 
                        albumName={ item.albumName }
                        navigationScreen="AlbumScreen"
                    />
                )}
                horizontal
                contentContainerStyle={ tailwind(`h-4/6 w-1/2 mx-1`) }
                keyExtractor={(item) => item.albumName}
            />
        </View>
    )
}

export default AlbumCarousel

const styles = StyleSheet.create({})
