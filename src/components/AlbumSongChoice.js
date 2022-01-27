import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { pickSong, setPlaylist } from '../store/taskAction';
import { Entypo } from '@expo/vector-icons';
import { auth, getDoc, doc, firestore } from '../firebase/firebase.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const AlbumSongChoice = ({ item, albumTracks, albumName, setShowing, showing, songMenuPosition }) => {
    const dispatch = useDispatch()
    const pickCurrentSong = (song) => dispatch(pickSong(song))
    const { currentSong } = useSelector(state => state)
    const [ isFavorite, setIsFavorite ] = useState(false)

    let minutes = Math.floor(item.duration / 60)
    let seconds = item.duration - minutes * 60

    const setMenuShowing = () => {
        if (showing) {
            setShowing(false)
        } else {
            setShowing(true)
        }
    }

    const getIsSongAFavorite = async () => {
        const docRef = doc(firestore, "users", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        const userInfo = docSnap.data()
        const favorites = userInfo.favorites
        for (let i = 0; i < favorites.length; i++) {
            if(favorites[i].trackName === item.trackName) {
                setIsFavorite(true)
            }
        }
    }

    useEffect(() => {
        getIsSongAFavorite()
    }, [])

    return (
        <Pressable
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
                tailwind(`rounded-lg w-full flex-row items-center px-3 justify-between py-2 border-t border-gray-300`)
            ]}
            onPress={() => {
                // setNewPlaylist(albumTracks)
                pickCurrentSong(item)
            }}
        >
            { item === currentSong ?
                <View>
                    <Entypo name="controller-play" size={24} color="black" />
                </View>
                :
                <View style={ tailwind(`justify-center items-center w-1/12`) }>
                    <Text style={ tailwind(`font-bold`) }>{ item.trackNumber }</Text>
                </View>
            }
            <View style={ tailwind(`justify-start flex-row w-9/12 items-center`) }>
                <View style={ tailwind(`justify-center`) }>
                    <Text style={ tailwind(`font-bold`) }>{ item.trackName }</Text>
                    <View style={ tailwind(`items-center justify-start flex-row`) }>
                        { item.explicit ? <MaterialIcons name="explicit" size={20} color="gray" style={ tailwind(`pr-1`) }/> : null }
                        <Text style={ tailwind(`text-xs italic`) }>{ item.trackArtist } — { albumName }</Text>
                    </View>
                </View>
                <View style={ tailwind(`justify-center pl-5 items-center`) }>
                    <Text style={ tailwind(`font-bold text-gray-600`) }>{ minutes }:{ seconds < 10 ? `0${seconds}` : seconds }</Text>
                </View>
            </View>
            { isFavorite ?
                <View style={ tailwind(`absolute right-14`) }>
                    <MaterialCommunityIcons name="heart" size={22} color="black" />
                </View>
                :
                null
            }
            <View style={ tailwind(`w-1/12`) }>
                <Pressable 
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                    onPress={() => {
                        if(showing) {
                            songMenuPosition.value = 100
                            setMenuShowing(false)
                        } else {
                            songMenuPosition.value = 0
                            setMenuShowing(true) 
                        }
                    }}
                >
                    <MaterialIcons name="more-vert" size={24} color="black" />
                </Pressable>
            </View>

        </Pressable>
    )
}

export default AlbumSongChoice

const styles = StyleSheet.create({})
