import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaying, pickSong } from '../store/taskAction'

const PlayAlbumButton = () => {
    const dispatch = useDispatch()
    const setIsPlaying = (playStatus) => dispatch(setPlaying(playStatus))
    const { isPlaying, currentSong, library } = useSelector(state => state)
    const pickCurrentSong = (song) => dispatch(pickSong(song))
    
    const findAlbum = () => {
        for (let i = 0; i < library.length; i++) {
            for (let j = 0; j < library[i].albums.length; j++) {
                for (let k = 0; k < library[i].albums[j].tracks.length; k++) {
                    if (currentSong === library[i].albums[j].tracks[k]) {
                        return library[i].albums[j].tracks
                    }
                }
            }
        }
    }

    const foundAlbum = findAlbum()

    return (
        <Pressable
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
                tailwind(`flex-row justify-evenly items-center bg-gray-200 rounded-lg w-32 py-2 mb-5 mx-10`),
                styles.shadow
            ]}
        >
            <FontAwesome5 name="play" size={24} style={ tailwind(`text-red-500`) } />
            <Text style={ tailwind(`p-2 text-red-500 font-bold`) }>Play</Text>
        </Pressable>
    )
}

export default PlayAlbumButton

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
