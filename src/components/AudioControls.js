import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, ActivityIndicator, View, Pressable, Text } from 'react-native'
import Animated from 'react-native-reanimated';
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaying, pickSong } from '../store/taskAction'

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
    }, [])

    useEffect(() => {
        const foundAlbum = findAlbum()
        const findIndexOfSong = (songObj) => songObj === currentSong 
        setFoundIndex(foundAlbum.findIndex(findIndexOfSong))
        LoadAudio();

        return () => Unload();
    }, [ currentSong ]);

    const Unload = async () => {
        await sound.current.unloadAsync();
    };

    const LoadAudio = async () => {
        SetLoading(true);
        const checkLoading = await sound.current.getStatusAsync();
        if (checkLoading.isLoaded === false) {
        try {
            const result = await sound.current.loadAsync(currentSong.trackUrl, {}, true);
            if (result.isLoaded === false) {
            SetLoading(false);
            console.log('Error in Loading Audio');
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

    const PlayAudio = async () => {
        try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
            if (result.isPlaying === false) {
            sound.current.playAsync();
            }
        }
        } catch (error) {}
    };

    const PauseAudio = async () => {
        try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
            if (result.isPlaying === true) {
            sound.current.pauseAsync();
            }
        }
        } catch (error) {}
    };

    const NextSong = () => {
        if (currentSong.id === foundAlbum[foundAlbum.length - 1].id) {
          pickCurrentSong(foundAlbum[0]);
        } else {
          pickCurrentSong(foundAlbum[foundIndex + 1]);
        }
    };

    const PrevSong = () => {
        if (currentSong.id === 0) {
          pickCurrentSong(foundAlbum[foundAlbum.length - 1]);
        } else {
          pickCurrentSong(foundAlbum[foundIndex - 1]);
        }
    };

    return (
        <Animated.View style={{ flex: 1 }}>
            <Animated.View style={[ tailwind(`w-1/6 h-full absolute left-1 rounded-lg`), { overflow: 'hidden' }, imageTransition ]}>
                <Animated.Image 
                    source={{ uri: currentSong.trackArt }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode='contain'
                />
            </Animated.View>
            <Animated.View style={[ tailwind(`w-3/6 px-3 absolute left-12`), songTitleContainerTransition ]}>
                <Animated.Text style={[ tailwind(`font-bold`), songTitleTransition ]}>{ currentSong.trackName }</Animated.Text>
                <Animated.Text style={[ tailwind(`text-sm`), authorNameTransition ]}>{ currentSong.trackArtist }</Animated.Text>
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
                            <>
                                { isShowing ?
                                    <Pressable
                                        style={({ pressed }) => [
                                            { opacity: pressed ? 0.5 : 1 }
                                        ]}
                                        onPress={() => {
                                            PrevSong()
                                        }}
                                    >
                                        <MaterialIcons name="skip-previous" size={32} color="black" />
                                    </Pressable>
                                    :
                                    null
                                }
                                <View>
                                    { isPlaying ?
                                        <Pressable 
                                            style={({ pressed }) => [
                                                { opacity: pressed ? 0.5 : 1 }
                                            ]}
                                            onPress={() => {
                                                setIsPlaying(false)
                                                PauseAudio()
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
                                                setIsPlaying(true)
                                                PlayAudio()
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
                            </>
                        )
                    }
                    </>
                )}
            </Animated.View>
        </Animated.View>
    )
}

export default AudioControls

const styles = StyleSheet.create({})
