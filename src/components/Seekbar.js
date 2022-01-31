import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import tailwind from 'tailwind-rn';

const Seekbar = ({
    positionMillis,
    durationMillis,
    sliderValue
}) => {
    const newSliderValue = positionMillis/durationMillis
    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const positionTime = millisToMinutesAndSeconds(positionMillis)
    const durationTime = millisToMinutesAndSeconds(durationMillis)
  return (
    <View>
       <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }, tailwind(`self-center`)} />
            <Text style={ tailwind(`w-full text-center`) }>
                {positionTime + ' / ' + durationTime}
            </Text>
        </View>
        <Slider
            minimumValue={0}
            maximumValue={1}
            value={newSliderValue}
            minimumTrackTintColor='#000'
            maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
            style={ tailwind(`w-full`) }
        />
    </View>
  );
}

export default Seekbar;

const styles = StyleSheet.create({});
