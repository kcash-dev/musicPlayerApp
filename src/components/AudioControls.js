import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

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
    isPlaying,
    playButtonMargin,
    setIsPlaying
}) => {
    const [ sound, setSound ] = useState();
    const [ status, setStatus ] = useState({
      shouldPlay: true
    })
    const [ sourceSound, setSourceSound ] = useState(songList[0].albums[0].tracks[0].trackUrl)

    console.log(sourceSound)
  
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
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);
  
    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(sourceSound)
        setSound(sound)

        await sound.playAsync()
        setPlaying(true)
    }
  
    const pauseAudio = async () => {
        setPlaying(false)
      try {
        const result = await sound.getStatusAsync();
        if (result.isLoaded) {
          if (result.isPlaying === true) {
            setPlaying()
            sound.pauseAsync();
          }
        }
      } catch (error) {}
    }

    const setPlaying = () => {
        if (isPlaying) {
            setIsPlaying(false)
        } else {
            setIsPlaying(true)
        }
    }

    return (
        <Animated.View style={{ flex: 1 }}>
            <Animated.View style={[ tailwind(`w-1/6 h-full absolute left-1 rounded-lg`), { overflow: 'hidden' }, imageTransition ]}>
                <Animated.Image 
                    source={{ uri: 'https://i.imgur.com/FEMO9iT.jpg' }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode='contain'
                />
            </Animated.View>
            <Animated.View style={[ tailwind(`w-3/6 px-3 absolute left-12`), songTitleContainerTransition ]}>
                <Animated.Text style={[ tailwind(`font-bold`), songTitleTransition ]}>Eulogy for a Rock Band</Animated.Text>
                <Animated.Text style={[ tailwind(`text-sm`), authorNameTransition ]}>Weezer</Animated.Text>
            </Animated.View>
            <Animated.View style={[ tailwind(`flex-row items-center justify-evenly absolute right-3`), controlButtonTransition ]}>
                { isShowing ? 
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.5 : 1 }
                        ]}
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
                            onPress={pauseAudio}
                        >
                            <MaterialIcons name="pause-circle-filled" size={ playButtonSize } color="black" />
                        </Pressable> 
                        :
                        <Pressable 
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 }
                            ]}
                            onPress={playAudio}
                        >
                            <MaterialIcons name="play-circle-filled" size={ playButtonSize } color="black" style={{ marginHorizontal: playButtonMargin }} />
                        </Pressable>
                    }
                </View>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                >
                    <MaterialIcons name="skip-next" size={ nextButtonSize } color="black" />
                </Pressable>
            </Animated.View>
        </Animated.View>
    )
}

export default AudioControls

const styles = StyleSheet.create({})
