import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Animated from 'react-native-reanimated';
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaying } from '../store/taskAction'

//Components
import { songList } from '../../assets/songList';

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
    const [ sourceSound, setSourceSound ] = useState()
    const [ i, setI ] = useState(0)

    const dispatch = useDispatch()
    const setIsPlaying = (playStatus) => dispatch(setPlaying(playStatus))
    const { isPlaying, currentSong, library, sound } = useSelector(state => state)

    const findSong = () => {
        for (let i = 0; i < library.length; i++) {
            for (let j = 0; j < library[i].albums.length; j++) {
                const found = library[i].albums[j].tracks.findIndex(song => {
                    const foundSong = song.trackName === currentSong.trackName
                    return foundSong
                })
            }
        }
    }

    findSong()

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
        return sound
          ? () => 
          unloadSound()
          : 
          undefined;
      }, [sound])

    const unloadSound = () => {
        console.log('Unloading Sound');
        sound.unloadAsync(); 
    }
  
    const playAudio = async () => {
        if (sourceSound === currentSong.trackUrl) {
            console.log("playing the current song")
            play()
        } else {
            loadNewSong()
        }
    }
  
    const pauseAudio = async () => {
        await sound.pauseAsync()
    }

    const nextSong = async () => {
        if(isPlaying === true) {
            pauseAudio()
        }
        setSourceSound(songList[0].albums[0].tracks[i + 1].trackUrl)
        const { sound } = await Audio.Sound.createAsync(songList[0].albums[0].tracks[i + 1].trackUrl)
        setIsPlaying(true)
        await sound.playAsync()
        setI(i + 1)
    }

    const previousSong = async () => {
        if(isPlaying === true) {
            pauseAudio()
        }
        setSourceSound(songList[0].albums[0].tracks[i - 1].trackUrl)
        const { sound } = await Audio.Sound.createAsync(songList[0].albums[0].tracks[i - 1].trackUrl)
        setIsPlaying(true)
        await sound.playAsync()
        setI(i - 1)
    }


    const play = async () => {
        await sound.playAsync()
    }

    const loadNewSong = async () => {
        setSourceSound(currentSong.trackUrl)
        const { sound } = await Audio.Sound.createAsync(currentSong.trackUrl)
        console.log("Loading")
        await sound.playAsync()
    }

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
                { isShowing ? 
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.5 : 1 }
                        ]}
                        onPress={() => {
                            setIsPlaying(false)
                            previousSong()
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
                                pauseAudio()
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
                                playAudio()
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
                        setIsPlaying(false)
                        nextSong()
                    }}
                >
                    <MaterialIcons name="skip-next" size={ nextButtonSize } color="black" />
                </Pressable>
            </Animated.View>
        </Animated.View>
    )
}

export default AudioControls

const styles = StyleSheet.create({})
