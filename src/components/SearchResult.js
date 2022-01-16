import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { pickSong } from '../store/taskAction';
import { useNavigation } from '@react-navigation/native';

const SearchResult = ({ 
    trackName,
    trackArtist,
    trackArt,
    explicit,
    albumName,
    albumArtist,
    albumYear,
    albumArt,
    artistName,
    artistPicture,
    item 
}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const setCurrentSong = (song) => dispatch(pickSong(song))
    const handlePress = () => {
        if(trackName) {
            setCurrentSong(item)
        } else if (albumName) {
            navigation.navigate('AlbumScreen', { item: item, artistName: albumArtist})
        } else if (artistName) {
            navigation.navigate('ArtistScreen', { item: item, artistName: albumArtist})
        }
    }
    return (
        <Pressable
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                tailwind(`flex-row w-full h-20 items-center justify-start border-b border-gray-400`)
            ]}
            onPress={() => handlePress()}
        >
            <View style={ tailwind(`w-1/12`) }>
            { explicit ?
                    <MaterialIcons 
                        name="explicit" 
                        size={20} 
                        color="gray" 
                        style={ tailwind(`pl-1`) }/> 
                    : 
                    null 
                }
            </View>
            <View style={ tailwind(`w-3/12 flex-wrap justify-center items-center`) }>
                <Image 
                    source={{ uri: trackArt || albumArt || artistPicture }}
                    style={[ { height: 50, width: 50 }, tailwind(`rounded-full`) ]}
                />
            </View>
            <View style={ tailwind(`w-4/12 flex-wrap justify-center items-center`) }>
                <Text style={ tailwind(`font-bold`) }>{ trackName || albumName || artistName }</Text>
            </View>
            { trackArtist ?
                <View style={ tailwind(`w-4/12 justify-center items-center`) }>
                    <Text style={ tailwind(`italic`) } >{ trackArtist }</Text>
                </View> 
                :
                null
            }
            { albumArtist ?
                <View style={ tailwind(`w-4/12 justify-center items-center`) }>
                    <Text style={ tailwind(`italic`) } >{ albumArtist }</Text>
                </View> 
                :
                null
            }
            { albumYear ?
                <View style={ tailwind(`w-4/12 justify-center items-center`) }>
                    <Text style={ tailwind(`italic`) } >{ albumYear }</Text>
                </View> 
                :
                null
            }
        </Pressable>
    )
}

export default SearchResult

const styles = StyleSheet.create({})
