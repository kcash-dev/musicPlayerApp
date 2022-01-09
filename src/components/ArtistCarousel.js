import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const ArtistCarousel = ({ item }) => {
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Text>{ item.artistName }</Text>
            </View>
        )
    }
    return (
        <View>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={ item }
              renderItem={renderItem}
            />
        </View>
    )
}

export default ArtistCarousel

const styles = StyleSheet.create({})
