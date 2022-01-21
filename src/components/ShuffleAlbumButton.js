import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import { useSelector, useDispatch } from 'react-redux';
import { pickSong, setPlaylist } from '../store/taskAction'

const ShuffleAlbumButton = ({ album }) => {
    const [ shuffledList, setShuffledList ] = useState()
    const dispatch = useDispatch()
    const { isPlaying, currentSong, library, playlist } = useSelector(state => state)
    const pickCurrentSong = (song) => dispatch(pickSong(song))
    const setNewPlaylist = (playlist) => dispatch(setPlaylist(playlist))
    
    useEffect(() => {
        shuffleAlbum();
    }, [])
    
    const shuffleAlbum = () => {
        const shuffled = []
        for (let i = 0; i < album.tracks.length; i++) {
            const number = getRandomInt(album.tracks.length)
            shuffled.push(album.tracks[number])
        }
        setShuffledList(shuffled)
        
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    return (
        <Pressable
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
                tailwind(`flex-row justify-evenly items-center bg-gray-200 rounded-lg w-32 py-2 mb-5 mx-10`),
                styles.shadow
            ]}
            onPress={() => {
                pickCurrentSong(shuffledList[0])
                setNewPlaylist(shuffledList)
            }}
        >
            <Ionicons name="ios-shuffle" size={32} style={ tailwind(`text-red-500`) } />
            <Text style={ tailwind(`p-2 text-red-500 font-bold`) }>Shuffle</Text>
        </Pressable>
    )
}

export default ShuffleAlbumButton

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