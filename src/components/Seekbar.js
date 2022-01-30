import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import tailwind from 'tailwind-rn';

const Seekbar = ({
    positionMillis,
    durationMillis,
    sliderValue
}) => {
    const newSliderValue = positionMillis/durationMillis
  return (
    <View>
       <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }, tailwind(`items-center`)} />
            <Text style={{ width: 40 }}>
                {positionMillis + ' / ' + durationMillis}
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
