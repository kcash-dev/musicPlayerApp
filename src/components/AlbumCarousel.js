import React, { useMemo } from 'react'
import { StyleSheet, View, Dimensions, FlatList } from 'react-native'
import tailwind from 'tailwind-rn'
import Carousel from 'react-native-reanimated-carousel'

//Components
import PressableSelection from './PressableSelection'

const AlbumCarousel = ({ item }) => {
    return (
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
            contentContainerStyle={ tailwind(`h-2/6 w-1/2 mx-1`) }
            keyExtractor={(item) => item.albumName}
        />
        // <Carousel
        //     width={windowWidth}
        //     style={{
        //         width: windowWidth * 0.8,
        //         alignSelf: 'center',
        //         justifyContent: 'center'
        //     }}
        //     enableSnap={ true }
        //     height={210}
        //     data={ item }
        //     autoPlay={ false }
        //     style={ tailwind(`self-center h-full`) }
        //     mode='horizontal-stack'
        //     renderItem={({ item }) => (
        //         <View style={ tailwind(`mt-4 h-full self-center`) }>
        //             <PressableSelection 
        //                 item={ item } 
        //                 artistName={ item.albumArtist } 
        //                 albumArt={ item.albumArt } 
        //                 albumName={ item.albumName }
        //                 navigationScreen="AlbumScreen"
        //             />
        //         </View>
        //     )}
        //     modeConfig={{
        //         snapDirection,
        //         stackInterval: 18
        //     }}
        // />
    )
}

export default AlbumCarousel

const styles = StyleSheet.create({})
