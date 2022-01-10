import React from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, ImageBackground, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';

//Components
import PlayerBar from '../components/PlayerBar';
import PlayAlbumButton from '../components/PlayAlbumButton';
import ShuffleAlbumButton from '../components/ShuffleAlbumButton';
import BackButton from '../components/BackButton';
import AlbumSongChoice from '../components/AlbumSongChoice';

//Redux
import { useSelector } from 'react-redux';

const AlbumScreen = ({ route }) => {
    const { item, artistName } = route.params;

    const currentSong = useSelector(state => state.currentSong)

    return (
        <SafeAreaView style={ tailwind(`flex-1 bg-white`) }>
            <BackButton />
            <View style={ tailwind(`h-2/6 border-b w-full flex-row`) }>
                <ImageBackground
                    source={{ uri: item.albumArt }}
                    style={[{ height: '100%', width: '100%' }, tailwind(`rounded-lg flex-1 justify-center items-center`)]}
                    resizeMode={'cover'}
                >
                    <View style={ tailwind(`items-center px-12 py-5 bg-black opacity-50 rounded-lg`) }>
                        <Text style={ tailwind(`text-center font-bold text-2xl text-white text-opacity-100`) }>{ item.albumName }</Text>
                        <Text style={ tailwind(`text-center font-bold text-lg text-white text-opacity-100`) }>{ artistName }</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={ tailwind(`flex-row items-center justify-evenly`) }>
                <PlayAlbumButton />
                <ShuffleAlbumButton 
                    album={ item }
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={ item.tracks }
                    style={ tailwind(`h-full`) }
                    renderItem={({ item }) => (
                        <AlbumSongChoice item={ item }/>
                    )}
                />
            </View>
            { currentSong ?
                <PlayerBar />
                :
                null
            }
        </SafeAreaView>
    )
}

export default AlbumScreen

const styles = StyleSheet.create({})
