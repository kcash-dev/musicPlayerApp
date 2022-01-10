import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TextInput, Dimensions, StatusBar, Platform } from 'react-native'
import tailwind from 'tailwind-rn';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';

//Components
import PlayerBar from '../components/PlayerBar';
import SearchButton from '../components/SearchButton';
import MusicSelectionMain from '../components/MusicSelectionMain';

const HomeScreen = () => {
    const [ statusBarHeight, setStatusBarHeight ] = useState();

    const currentSong = useSelector(state => state.currentSong)

    const getStatusBar = () => {
        if (Platform.OS === 'ios') {
            const height = getStatusBarHeight()
            setStatusBarHeight(height)
        } else {
            setStatusBarHeight(StatusBar.currentHeight)
        }
    }

    useEffect(() => {
        getStatusBar()
    }, [])

    return (
        <SafeAreaView style={ tailwind(`flex-1 bg-white h-full`) }>
            <SearchButton />
            <View style={ tailwind(`my-12`) }>
                <Text style={ tailwind(`text-3xl font-bold text-center`) }>Listen Now</Text>
            </View>
            <MusicSelectionMain />
            { currentSong ?
                <PlayerBar />
                :
                null
            }
        </SafeAreaView>
    )
}

export default HomeScreen

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
