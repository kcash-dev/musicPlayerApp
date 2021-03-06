import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { pickSong, setPlaylist } from '../store/taskAction';
import AlbumMenu from './AlbumMenu';

const AlbumSongChoice = ({ item }) => {
    const dispatch = useDispatch()
    const pickCurrentSong = (song) => dispatch(pickSong(song))
    const { currentSong } = useSelector(state => state)
    const [ menuShowing, setMenuShowing ] = useState(false)

    let minutes = Math.floor(item.duration / 60)
    let seconds = item.duration - minutes * 60

    return (
        <Pressable
            style={({ pressed }) => [
                { 
                    opacity: pressed ? 0.7 : 1, 
                },
                tailwind(`rounded-lg w-full flex-row items-center px-3 justify-between py-2 border-t border-gray-300`)
            ]}
            onPress={() => pickCurrentSong(item)}
        >
            <View style={ tailwind(`justify-start flex-row w-10/12 items-center`) }>
                <View style={ tailwind(`justify-center w-2/3`) }>
                    <Text style={ tailwind(`font-bold`) }>{ item.trackName }</Text>
                    <View style={ tailwind(`items-center justify-start flex-row`) }>
                        { item.explicit ? <MaterialIcons name="explicit" size={20} color="gray" style={ tailwind(`pr-1`) }/> : null }
                        <Text style={ tailwind(`text-xs italic`) }>{ item.trackArtist } — { item.albumName }</Text>
                    </View>
                </View>
                <View style={ tailwind(`justify-center w-1/3`) }>
                    <Text style={ tailwind(`font-bold text-gray-600`) }>{ minutes }:{ seconds < 10 ? `0${seconds}` : seconds }</Text>
                </View>
            </View>
            <View style={ tailwind(`w-1/12`) }>
                <Pressable 
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                    onPress={() => {
                        if(menuShowing) {
                            setMenuShowing(false)
                        } else {
                            setMenuShowing(true) 
                        }
                    }}
                >
                    <MaterialIcons name="more-vert" size={24} color="black" />
                </Pressable>
            </View>
            { menuShowing ?
                <AlbumMenu />
                :
                null
            }
        </Pressable>
    )
}

export default AlbumSongChoice

const styles = StyleSheet.create({})
