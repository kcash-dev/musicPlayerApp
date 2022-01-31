import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation()
    return (
        <Pressable
            style={({ pressed }) => [
                { 
                    opacity: pressed ? 0.7 : 1,
                    zIndex: 10
                }
            ]}
            onPress={() => navigation.pop()}
        >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({})
