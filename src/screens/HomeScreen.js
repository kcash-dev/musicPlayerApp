import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Platform, Dimensions } from 'react-native'
import tailwind from 'tailwind-rn';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';

//Components
import PlayerBar from '../components/PlayerBar';
import SearchButton from '../components/SearchButton';
import MusicSelectionMain from '../components/MusicSelectionMain';
import UserButton from '../components/UserButton';
import { auth, firestore, getDoc, doc } from '../firebase/firebase';

const windowHeight = Dimensions.get('window').height

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

    const getUserInfoFirestore = async () => {
        const docRef = doc(firestore, "users", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        const userInfo = docSnap.data()
        auth.currentUser.displayName = userInfo.name
        auth.currentUser.photoURL = userInfo.photoURL
    } 

    useEffect(() => {
        getStatusBar()
        getUserInfoFirestore()
    }, [])

    return (
        <SafeAreaView style={[ tailwind(`bg-white h-full`) ]}>
            <View style={[ tailwind(`bg-white`), styles.shadow ]}>
                <SearchButton />
                <Image 
                    source={{ uri: 'https://i.imgur.com/pH6JB4O.jpg' }}
                    style={[{ height: '35%', width: '35%' }, tailwind(`absolute top-6 left-1/3`), { zIndex: -1 } ]}
                    resizeMode='contain'
                />
                <UserButton />
                <View style={[ tailwind(`mt-20`), { zIndex: -1 } ]}>
                    <Text style={ tailwind(`text-3xl font-bold text-center pb-3`) }>Listen Now</Text>
                </View>
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
