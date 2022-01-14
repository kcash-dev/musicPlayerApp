import React from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

//Components
import PlayerBar from '../components/PlayerBar';
import PlayAlbumButton from '../components/PlayAlbumButton';
import ShuffleAlbumButton from '../components/ShuffleAlbumButton';
import BackButton from '../components/BackButton';
import AlbumSongChoice from '../components/AlbumSongChoice';

//Redux
import { useSelector } from 'react-redux';
import OtherArtistAlbums from '../components/OtherArtistAlbums';
import ArtistPressableSelection from '../components/ArtistPressableSelection';

const AlbumScreen = ({ route }) => {
    const { item, artistName } = route.params;
    let duration = 0
    const navigation = useNavigation()

    const currentSong = useSelector(state => state.currentSong)
    const album = item.albumName

    const getAlbumDuration = () => {
        for (let i = 0; i < item.tracks.length; i++) {
            duration = duration + item.tracks[i].duration
        }
    }

    console.log(item)
   
    getAlbumDuration()

    const hours = Math.floor(duration / 3600)
    const remaining = duration % 3600
    const minutes = Math.floor(remaining / 60)
    const seconds = remaining % 60

    const footer = () => {
        return (
            <View style={ tailwind(`h-full pb-10`) }>
                <Text style={ tailwind(`text-gray-500 text-sm text-center my-1`) }>{ item.tracks.length } { item.tracks.length > 1 ? 'songs' : 'song' }, { hours < 1 ? null : `${hours} hours` }{ minutes } minutes and { seconds < 10 ? `0${seconds}` : seconds } seconds</Text>
                <View style={ tailwind(`px-3`) }>
                    <Text style={ tailwind(`font-bold text-lg`) }>Other Albums</Text>
                    <OtherArtistAlbums item={ item } />
                </View>
                <View style={ tailwind(`px-3`) }>
                    <Text style={ tailwind(`font-bold text-lg`) }>Artist</Text>
                    <ArtistPressableSelection 
                        item={ item } 
                        artistName={ item.albumArtist } 
                        artistPicture={ item.artistPicture }
                        navigationScreen='ArtistScreen'
                    />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={ tailwind(`flex-1 bg-white`) }>
            <BackButton />
            <View style={ tailwind(`h-2/6 w-full flex-row rounded-lg mt-5`) }>
                <View style={[ tailwind(`w-2/5 h-full justify-center mx-5`), styles.shadow ]}>
                    <Image
                        source={{ uri: item.albumArt }}
                        style={[{ height: '60%', width: '100%' }, tailwind(`rounded-lg`)]}
                        resizeMode='cover'
                    />
                </View>
                <View style={ tailwind(`justify-center w-3/5 flex-shrink`) }>
                    <Text style={ tailwind(`font-bold text-xl`) }>{ item.albumName }</Text>
                    <Text style={ tailwind(``) }>by 
                        <Pressable 
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                tailwind(`justify-center`)
                            ]}
                            onPress={() => navigation.navigate('ArtistScreen', { item: item })}
                        >
                            <Text style={ tailwind(`top-1 left-1 font-bold`) }>{ artistName }</Text>
                        </Pressable>
                    </Text>
                    <View style={ tailwind(`justify-start items-center flex-row`) }>
                        { item.explicit ? <MaterialIcons name="explicit" size={24} color="gray" style={ tailwind(`pr-1`) }/> : null }
                        <Text style={ tailwind(`font-bold text-gray-400`) }>Album · { item.albumYear }</Text>
                    </View>
                </View>
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
                        <AlbumSongChoice item={ item } album={ album }/>
                    )}
                    keyExtractor={(item) => item.trackName}
                    ListFooterComponent={ footer }
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

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})
