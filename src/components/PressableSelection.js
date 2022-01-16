import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';

const PressableSelection = ({ item, artistName, navigationScreen, artistPicture, albumArt, albumName, explicit }) => {
    const navigation = useNavigation()
    return (
        <Pressable
            style={({ pressed }) => [
                { 
                    opacity: pressed ? 0.7 : 1
                },
                tailwind(`w-full px-3`)
            ]}
            onPress={() => navigation.navigate(navigationScreen, { item: item, artistName: artistName })}
        >
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
        </Pressable>
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
