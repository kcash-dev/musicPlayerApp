import React from 'react'
import { StyleSheet, Text, View, Pressable, Image, SafeAreaView, ImageBackground, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

//Components
import PlayerBar from '../components/PlayerBar'
import BackButton from '../components/BackButton'
import PressableSelection from '../components/PressableSelection'
import AlbumCarousel from '../components/AlbumCarousel'

const ArtistScreen = ({ route }) => {
    const navigation = useNavigation()
    const { item } = route.params;
    const artistName = item.artistName

    const songs = useSelector(state => state.library)
    return (
        <SafeAreaView style={ tailwind(`flex-1 bg-white`)}>
            <BackButton />
            <View style={ tailwind(`h-2/6 border-b w-full flex-row`) }>
                <ImageBackground
                    source={{ uri: item.artistPicture }}
                    style={[{ height: '100%', width: '100%' }, tailwind(`rounded-lg flex-1 justify-center items-center`)]}
                    resizeMode={'cover'}
                >
                    <View style={ tailwind(`items-center px-12 py-5 bg-black opacity-50 rounded-lg`) }>
                        <Text style={ tailwind(`font-bold text-2xl text-white text-opacity-100`) }>{ item.artistName }</Text>
                        <Text style={ tailwind(`italic text-lg text-white text-opacity-100`) }>{ item.genre }</Text>
                    </View>
                </ImageBackground>
            </View>
            <AlbumCarousel item={ item } artistName={ artistName }/>
            <PlayerBar />
        </SafeAreaView>
    )
}

export default ArtistScreen

const styles = StyleSheet.create({})
