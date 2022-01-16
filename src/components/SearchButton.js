import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Pressable, TextInput, FlatList, Dimensions, Text } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { useSelector } from 'react-redux'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

//Components
import SearchResult from './SearchResult';

const SearchButton = () => {
    const [ search, setSearch ] = useState('')
    const [ artistList, setArtistList ] = useState()
    const [ albumList, setAlbumList ] = useState()
    const [ songList, setSongList ] = useState()
    const [ filteredArtist, setFilteredArtist ] = useState()
    const [ filteredAlbum, setFilteredAlbum ] = useState()
    const [ filteredSong, setFilteredSong ] = useState()
    const [ expanded, setExpanded ] = useState(false)
    const barWidth = useSharedValue(0)
    const { library } = useSelector(state => state)
    const searchBarHeight = useSharedValue(windowHeight)

    const searchConfig = {
        duration: 200
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(barWidth.value, searchConfig)
        }
    })

    const transitionConfig = {
        duration: 200
    }

    const searchBarStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(searchBarHeight.value, transitionConfig) }]
        }
    })

    const sortCategories = () => {
        const artists = []
        const albums = []
        const songs = []
        for(let i = 0; i < library.length; i++) {
            artists.push({
                artistName: library[i].artistName,
                artistPicture: library[i].artistPicture
            })
            for (let j = 0; j < library[i].albums.length; j++) {
                albums.push(library[i].albums[j])
                for (let k = 0; k < library[i].albums[j].tracks.length; k++) {
                    songs.push(library[i].albums[j].tracks[k])
                }
            }
        }
        setArtistList(artists)
        setAlbumList(albums)
        setSongList(songs)
    }

    useEffect(() => {
        sortCategories()
    }, [])

    const searchFilterFunction = (text) => {
        if(text) {
            const filteredSongs = songList.filter((item) => {
                return item.trackName.toUpperCase().includes(text.toUpperCase())
            })
            const filteredAlbums = albumList.filter((item) => {
                return item.albumName.toUpperCase().includes(text.toUpperCase())
            })
            const filteredArtists = artistList.filter((item) => {
                return item.artistName.toUpperCase().includes(text.toUpperCase())
            })

            setFilteredArtist(filteredArtists)
            setFilteredAlbum(filteredAlbums)
            setFilteredSong(filteredSongs)
            setSearch(text)
        } else {
            setSearch('')
        }
    }

    return (
        <View>
            <View style={[ tailwind(`absolute top-6 left-3 self-center flex-row items-center bg-gray-100 rounded-full p-1`), styles.shadow ]}>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 },
                        tailwind(``)
                    ]}
                    onPress={() => {
                        if (!expanded) {
                            setExpanded(true)
                            barWidth.value = 250
                            searchBarHeight.value = 75
                        } else {
                            setExpanded(false)
                            barWidth.value = 0
                            searchBarHeight.value = windowHeight
                        }
                    }}
                >
                    <MaterialIcons name="search" size={32} color="gray" />
                </Pressable>
                <Animated.View
                    style={[ tailwind(`flex-row justify-between`), animatedStyles ]}
                >
                    <TextInput 
                        placeholder='Search'
                        value={ search }
                        onChangeText={(text) => searchFilterFunction(text)}
                    />
                    { expanded ?
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 }
                            ]}
                            onPress={() => {
                                if(search) {
                                    setSearch('')
                                } else if (search === '') {
                                    setExpanded(false)
                                    barWidth.value = 0
                                    searchBarHeight.value = windowHeight
                                }
                                setFilteredSong()
                                setFilteredAlbum()
                                setFilteredArtist()
                            }}
                        >
                            <MaterialCommunityIcons name="close-circle" size={24} color="gray" />
                        </Pressable>
                        :
                        null
                    }
                </Animated.View>
            </View>
            <Animated.View
            style={[ 
                tailwind(`absolute bg-white bg-opacity-100 rounded-lg`), 
                { width: windowWidth, height: windowHeight, zIndex: 1 }, 
                searchBarStyles,
                styles.shadow,
                { flex: 1 }  
            ]}>
                <View>
                    <View style={[ tailwind(`items-center border-b border-opacity-20 border-gray-400 bg-white`), styles.shadow ]}>
                        <Text style={ tailwind(`text-lg text-gray-600 font-bold`) }>Songs</Text>
                    </View>
                    <FlatList 
                        data={ filteredSong }
                        keyExtractor={item => item.trackName}
                        renderItem={({ item }) => (
                            <SearchResult
                                item={ item } 
                                trackName={ item.trackName }
                                trackArtist={ item.trackArtist }
                                trackArt={ item.trackArt }
                                explicit={ item.explicit } 
                            />
                        )}
                    />
                </View>
                <View>
                    <View style={[ tailwind(`items-center border-b border-opacity-20 border-gray-400 bg-white`), styles.shadow ]}>
                        <Text style={ tailwind(`text-lg text-gray-600 font-bold`) }>Albums</Text>
                    </View>
                    <FlatList 
                        data={ filteredAlbum }
                        keyExtractor={item => item.albumName}
                        renderItem={({ item }) => (
                            <SearchResult
                                item={ item } 
                                albumName={ item.albumName }
                                albumArtist={ item.albumArtist }
                                albumYear={ item.albumYear }
                                albumArt={ item.albumArt }
                                explicit={ item.explicit }
                            />
                        )}
                    />
                </View>
                <View>
                    <View style={[ tailwind(`items-center border-b border-opacity-20 border-gray-400 bg-white`), styles.shadow ]}>
                        <Text style={ tailwind(`text-lg text-gray-600 font-bold`) }>Artists</Text>
                    </View>
                    <FlatList 
                        data={ filteredArtist }
                        keyExtractor={item => item.artistName}
                        renderItem={({ item }) => (
                            <SearchResult
                                item={ item } 
                                artistName={ item.artistName }
                                artistPicture={ item.artistPicture }
                            />
                        )}
                    />
                </View>
            </Animated.View>
        </View>
    )
}

export default SearchButton

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
