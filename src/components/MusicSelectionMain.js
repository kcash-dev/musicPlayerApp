import React from 'react'
import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tailwind from 'tailwind-rn'
import { useSelector } from 'react-redux'
import Carousel from 'react-native-reanimated-carousel'

const MusicSelectionMain = () => {
    const navigation = useNavigation()
    const artists = useSelector(state => state.library)
    return (
        <View style={ tailwind(`h-full w-full`) }>
            <Carousel
                width={300}
                height={150}
                data={ artists }
                style={ tailwind(`self-center h-full`) }
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.7 : 1 },
                            tailwind(`rounded-lg h-full`)
                        ]}
                        onPress={() => navigation.navigate('ArtistScreen', { item: item })}
                    >
                        <Text style={ tailwind(`text-center`) }>{ item.artistName }</Text>
                        <Image 
                            source={{ uri: item.artistPicture }}
                            style={[{ height: '100%', width: '100%' }, tailwind(`rounded-lg`)]}
                            resizeMode='contain'
                        />
                    </Pressable>
                )}
            />
        </View>
    )
}

export default MusicSelectionMain

const styles = StyleSheet.create({})
