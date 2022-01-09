import React from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, ImageBackground, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';

//Components
import PlayerBar from '../components/PlayerBar';
import PlayAlbumButton from '../components/PlayAlbumButton';
import ShuffleAlbumButton from '../components/ShuffleAlbumButton';
import BackButton from '../components/BackButton';

const AlbumScreen = ({ route }) => {
    const { item, artistName } = route.params;
    console.log(item, "ALBUM ITEM")
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
                <ShuffleAlbumButton />
            </View>
            <View>
                <FlatList
                    data={ item.tracks }
                    style={ tailwind(`h-full`) }
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.7 : 1 },
                                tailwind(`rounded-lg w-full flex-row items-center px-3 justify-between py-2 border-t border-gray-300`)
                            ]}
                            // onPress={() => navigation.navigate('ArtistScreen', { item: item })}
                        >
                            <View style={ tailwind(`justify-center items-center w-1/12`) }>
                                <Text style={ tailwind(`font-bold`) }>{ item.trackNumber }</Text>
                            </View>
                            <View style={ tailwind(`justify-start flex-row w-10/12`) }>
                                <View style={ tailwind(`justify-center w-2/3`) }>
                                    <Text style={ tailwind(`font-bold`) }>{ item.trackName }</Text>
                                    <Text style={ tailwind(`text-xs italic`) }>{ artistName }</Text>
                                </View>
                                <View style={ tailwind(`justify-center w-1/3`) }>
                                    <Text style={ tailwind(`font-bold text-gray-600`) }>3:14</Text>
                                </View>
                            </View>
                            <View style={ tailwind(`w-1/12`) }>
                                <Pressable 
                                    style={({ pressed }) => [
                                        { opacity: pressed ? 0.5 : 1 }
                                    ]}
                                >
                                    <MaterialIcons name="more-vert" size={24} color="black" />
                                </Pressable>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
            <PlayerBar />
        </SafeAreaView>
    )
}

export default AlbumScreen

const styles = StyleSheet.create({})
