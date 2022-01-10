import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import Carousel from 'react-native-reanimated-carousel'

//Components
import PressableSelection from './PressableSelection'

const windowWidth = Dimensions.get('window').width

const AlbumCarousel = ({ item }) => {
    return (
        <Carousel
            width={windowWidth}
            height={175}
            data={ item }
            style={ tailwind(`self-center h-full`) }
            mode='parallax'
            renderItem={({ item }) => (
                <View style={ tailwind(`mt-4 h-full`) }>
                    <PressableSelection 
                        item={ item } 
                        artistName={ item.albumArtist } 
                        albumArt={ item.albumArt } 
                        albumName={ item.albumName }
                        navigationScreen="AlbumScreen"
                    />
                </View>
            )}
        />
    )
}

export default AlbumCarousel

const styles = StyleSheet.create({})
