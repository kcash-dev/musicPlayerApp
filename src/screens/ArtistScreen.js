import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'

//Components
import PlayerBar from '../components/PlayerBar'
import BackButton from '../components/BackButton'
import AlbumCarousel from '../components/AlbumCarousel'

const ArtistScreen = ({ route }) => {
    const { item, artistName  } = route.params;
    const currentSong = useSelector(state => state.currentSong)

    return (
        <SafeAreaView style={ tailwind(`flex-1 bg-white`)}>
            <BackButton />
            <View style={ tailwind(`h-2/6 border-b w-full flex-row`) }>
                <ImageBackground
                    source={{ uri: item.artistPicture }}
                    style={[{ height: '100%', width: '100%' }, tailwind(`rounded-lg flex-1 justify-center items-center`)]}
                    resizeMode='cover'
                >
                    <View style={ tailwind(`items-center px-12 py-5 bg-black opacity-50 rounded-lg`) }>
                        <Text style={ tailwind(`font-bold text-2xl text-white text-opacity-100`) }>{ item.artistName }</Text>
                        <Text style={ tailwind(`italic text-lg text-white text-opacity-100`) }>{ item.genre }</Text>
                    </View>
                </ImageBackground>
            </View>
            <AlbumCarousel item={ item } artistName={ artistName }/>
            { currentSong ?
                <PlayerBar />
                :
                null
            }
        </SafeAreaView>
    )
}

export default ArtistScreen

const styles = StyleSheet.create({})
