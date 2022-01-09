import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'

//Components
import PlayerBar from '../components/PlayerBar'

const AlbumScreen = ({ route }) => {
    const { tracks, albumArt, albumName, artist, genre } = route.params;
    const songs = useSelector(state => state.library)
    return (
        <View>
            <View>
            </View>
            <View>
                <FlatList 
                    data={ tracks }
                    renderItem={({ item }) => (
                        <View style={ tailwind(`w-full items-center p-4 border`) }>
                            <Text>{ item.trackName }</Text>
                        </View>
                    )}
                />
            </View>
            <PlayerBar />
        </View>
    )
}

export default AlbumScreen

const styles = StyleSheet.create({})
