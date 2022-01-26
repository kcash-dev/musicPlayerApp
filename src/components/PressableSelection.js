import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
  } from 'react-native-reanimated';

//Components
import PressableWrapper from './PressableWrapper';


const PressableSelection = ({ item, artistName, navigationScreen, artistPicture, albumArt, albumName, explicit }) => {
    const navigation = useNavigation()

    const buttonSize = useSharedValue(1)

    const transitionConfig = {
        duration: 50
    }
      
    const buttonAnimatedStyles = useAnimatedStyle(() => {
      return {
          transform: [{ scale: withTiming(buttonSize.value, transitionConfig) }]
      }
    })

    const navigationFunction = () => {
        navigation.navigate(navigationScreen, { item: item, artistName: artistName })
    }

    return (
        <PressableWrapper
            pressOut={navigationFunction}
            style={ tailwind(`w-11/12`) }
        >
            <Animated.View style={[ tailwind(`h-full`), buttonAnimatedStyles ]}>
                <View style={[ styles.shadow, tailwind(`h-full`) ]}>
                    { albumArt ? 
                        <Image 
                            source={{ uri: albumArt }}
                            style={[{ height: '110%', width: '100%' }, tailwind(`rounded-lg`) ]}
                            resizeMode='cover'
                        />
                        :
                        <Image 
                            source={{ uri: artistPicture }}
                            style={[{ height: '110%', width: '100%' }, tailwind(`rounded-lg`) ]}
                            resizeMode='cover'
                        />
                    }
                </View>
                { albumName ? 
                    <View style={ tailwind(`items-center flex-row mt-5`) }>
                        <View style={ tailwind(`w-3/4`) }>
                            <Text style={ tailwind(`text-xs font-bold`) }>{ albumName }</Text>
                            <View style={ tailwind(`flex-row justify-start items-center`) }>
                                { explicit ? <MaterialIcons name="explicit" size={20} color="gray" style={ tailwind(`pr-1`) }/> : null }
                                <Text style={ tailwind(`text-xs`) }>Album · { artistName }</Text>
                            </View>
                        </View>
                        <View style={ tailwind(`w-1/4`) }>
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
                            <MaterialIcons name="more-vert" size={18} color="black" />
                        </Pressable>
                        </View>
                    </View>
                    :
                    null
                }
            </Animated.View>
        </PressableWrapper>
    )
}

export default PressableSelection

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
