import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, ActivityIndicator, View, Pressable, Text, Alert } from 'react-native'
import Animated from 'react-native-reanimated';
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaying, pickSong, setPlaylist } from '../store/taskAction'
import { auth, firestore, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from '../firebase/firebase'

//Components
import Seekbar from './Seekbar';

const AudioControls = ({ 
    imageTransition,
    songTitleContainerTransition,
    songTitleTransition,
    authorNameTransition,
    controlButtonTransition,
    playButtonSize,
    nextButtonSize,
    isShowing,
    playButtonMargin,
}) => {
    const [ Loaded, SetLoaded ] = useState(false);
    const [ Loading, SetLoading ] = useState(false);
    const [ foundIndex, setFoundIndex ] = useState()
    const sound = useRef(new Audio.Sound());
    const [ favorites, setFavorites ] = useState();
    const [ isFavorite, setIsFavorite ] = useState(false)
    const [ playlistNumber, setPlaylistNumber ] = useState(0)
    const [ trackState, setTrackState ] = useState(
        {
            playbackObject: null,
            volume: 1.0,
            isBuffering: false,
            paused: true,
            currentIndex: 0,
            durationMillis: 1,
            positionMillis:0,
            sliderValue:0,
            isSeeking:false,
        }
    )

    const dispatch = useDispatch()
    const setIsPlaying = (playStatus) => dispatch(setPlaying(playStatus))
    const { isPlaying, currentSong, library, playlist } = useSelector(state => state)
    const pickCurrentSong = (song) => dispatch(pickSong(song))
    const setNewPlaylist = (playlist) => dispatch(setPlaylist(playlist))

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

    const findSongIndex = () => {
        for(let i = 0; i < playlist.length; i++) {
            if (playlist[i].trackName === currentSong.trackName) {
                setPlaylistNumber(i)
            }
        }
    }

    useEffect(() => {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })
      getFavorites();
    }, [])

    useEffect(() => {
        const foundAlbum = findAlbum()
        const findIndexOfSong = (songObj) => songObj.id === currentSong.id
        setFoundIndex(foundAlbum.findIndex(findIndexOfSong))
        if(playlist.length === 0) {
            setNewPlaylist(foundAlbum)
        }
        LoadAudio();
        findSongIndex()

        return () => Unload();
    }, [ currentSong ]);

    const Unload = async () => {
        await sound.current.unloadAsync();
    };

    const onPlaybackStatusUpdate = status => {
        setTrackState({
            ...trackState,
            isBuffering: status.isBuffering,
            durationMillis: status.durationMillis,
            positionMillis: status.positionMillis
        })
    }

    const LoadAudio = async () => {
        SetLoading(true);
        const checkLoading = await sound.current.getStatusAsync();
        if (checkLoading.isLoaded === false) {
            try {
                const status = {
                    shouldPlay: isPlaying,
                    volume: trackState.volume,
                }
                sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
                const result = await sound.current.loadAsync(currentSong.uri, status, true);
                setTrackState({
                    ...trackState,
                    playbackObject: sound
                })
                const sliderValue = trackState.positionMillis/trackState.durationMillis
                // setTrackState({
                //     ...trackState,
                //     sliderValue: sliderValue
                // })
                if (result.isLoaded === false) {
                    SetLoading(false);
                    Alert.alert('Something went wrong.')
                } else {
                    SetLoading(false);
                    SetLoaded(true);
                }
            } catch (error) {
                console.log(error);
                SetLoading(false);
            }
        } else {
            SetLoading(false);
        }
    };

    const handlePlayPause = async () => {
        try {
            const result = await sound.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === false) {
                    sound.current.playAsync();
                } else {
                    sound.current.pauseAsync()
                }
                setIsPlaying(!isPlaying)
            }
        } catch (error) {}
    };

    const NextSong = () => {
        pickCurrentSong(playlist[playlistNumber + 1])
    };

    const PrevSong = () => {
        pickCurrentSong(playlist[playlistNumber - 1])
    };

    const addSongToFavorites = async (song) => {
        if(!favorites?.includes(song)) {
            const docRef = doc(firestore, "users", auth.currentUser.uid)
            const updateFavorites = await updateDoc(docRef, {
                favorites: arrayUnion(song)
            })
        }
    }

    const getFavorites = async () => {
        const docRef = doc(firestore, "users", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        const userInfo = docSnap.data()
        setFavorites(userInfo.favorites)
    }

    return (
        <Animated.View style={{ flex: 1 }}>
            <Animated.View style={[ 
                tailwind(`w-1/6 h-full absolute left-1 rounded-lg`), 
                { overflow: 'hidden' }, 
                imageTransition
            ]}>
                <Animated.Image 
                    source={{ uri: currentSong.trackArt }}
                    style={[{ width: '100%', height: '100%', borderRadius: 10 } ]}
                    resizeMode='contain'
                />
            </Animated.View>
            <Animated.View 
                style={[ 
                    songTitleContainerTransition
                ]}
            >
                <Animated.Text style={[ tailwind(`font-bold`), songTitleTransition, isShowing ? tailwind(`self-center`) : null ]}>{ currentSong.trackName }</Animated.Text>
                <Animated.Text style={[ tailwind(`text-sm`), authorNameTransition, isShowing ? tailwind(`self-center`) : null ]}>{ currentSong.trackArtist }</Animated.Text>
            </Animated.View>
            <Animated.View style={[ tailwind(`flex-row items-center justify-evenly absolute right-3`), controlButtonTransition ]}>
                { Loading ? (
                    <ActivityIndicator size={'small'} color={'black'} />
                ) : (
                    <>
                    { Loaded === false ? (
                        <>
                            <ActivityIndicator />
                            <Text>Loading Song</Text>
                        </>
                        ) : (
                            <View>
                                { isShowing ?
                                    <View style={ tailwind(`w-10/12 self-center`) }>
                                        <Seekbar 
                                            durationMillis={ trackState.durationMillis }
                                            positionMillis={ trackState.positionMillis }
                                            sliderValue={ trackState.sliderValue }
                                        />
                                    </View>
                                    :
                                    null
                                }
                                <View style={ tailwind(`flex-row items-center justify-evenly`) }>
                                    { isShowing ?
                                        <Pressable
                                            style={({ pressed }) => [
                                                { opacity: pressed ? 0.5 : 1 }
                                            ]}
                                            onPress={() => {
                                                PrevSong()
                                            }}
                                        >
                                            <MaterialIcons name="skip-previous" size={nextButtonSize} color="black" />
                                        </Pressable>
                                        :
                                        null
                                    }
                                    {/* { isFavorite ?
                                        <View>
                                            <Pressable 
                                                    style={({ pressed }) => [
                                                        { opacity: pressed ? 0.5 : 1 }
                                                    ]}
                                                    onPress={() => addSongToFavorites(currentSong)}
                                                >
                                                    <MaterialCommunityIcons name="cards-heart" size={ playButtonSize } color="black" />
                                            </Pressable> 
                                        </View>
                                        :
                                        <View>
                                            <Pressable 
                                                    style={({ pressed }) => [
                                                        { opacity: pressed ? 0.5 : 1 }
                                                    ]}
                                                    onPress={() => addSongToFavorites(currentSong)}
                                                >
                                                    <MaterialCommunityIcons name="heart-outline" size={ playButtonSize } color="black" />
                                            </Pressable> 
                                        </View>
                                    } */}
                                    <View>
                                        { isPlaying ?
                                            <Pressable 
                                                style={({ pressed }) => [
                                                    { opacity: pressed ? 0.5 : 1 }
                                                ]}
                                                onPress={() => {
                                                    handlePlayPause()
                                                }}
                                            >
                                                <MaterialIcons name="pause-circle-filled" size={ playButtonSize } color="black" />
                                            </Pressable> 
                                            :
                                            <Pressable 
                                                style={({ pressed }) => [
                                                    { opacity: pressed ? 0.5 : 1 }
                                                ]}
                                                onPress={() => {
                                                    handlePlayPause()
                                                }}
                                            >
                                                <MaterialIcons name="play-circle-filled" size={ playButtonSize } color="black" style={{ marginHorizontal: playButtonMargin }} />
                                            </Pressable>
                                        }
                                    </View>
                                    <Pressable
                                        style={({ pressed }) => [
                                            { opacity: pressed ? 0.5 : 1 }
                                        ]}
                                        onPress={() => {
                                            NextSong()
                                        }}
                                    >
                                        <MaterialIcons name="skip-next" size={ nextButtonSize } color="black" />
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }
                    </>
                )}
            </Animated.View>
        </Animated.View>
    )
}

export default AudioControls

const styles = StyleSheet.create({
    centeredTitle: {
        textAlign: 'center',
    },
    centeredContainer: {
        alignSelf: 'center',
        width: '100%'
    },
    playerSmall: {
        position: 'absolute',
        width: '50%',
        paddingHorizontal: 12,
        left: 48
    },
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
