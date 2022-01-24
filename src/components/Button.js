import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from 'tailwind-rn';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated';

const Button = ({ text, pressInFunction, pressOutFunction, color }) => {
    const buttonSize = useSharedValue(1)

    const transitionConfig = {
        duration: 50
      }
      
    const buttonAnimatedStyles = useAnimatedStyle(() => {
      return {
          transform: [{ scale: withTiming(buttonSize.value, transitionConfig) }]
      }
    })

    const runPressInFunction = () => {
      pressInFunction()
    }

    const runPressOutFunction = () => {
      pressOutFunction()
    }
  return (
    <Animated.View style={buttonAnimatedStyles}>
        <Pressable 
        style={({ pressed }) => [
            { 
            opacity: pressed ? 0.7 : 1
            },
            tailwind(`items-center justify-center px-10 py-3 bg-${color}-400 rounded-lg mt-5`),
            styles.shadow,
        ]}
        onPressIn={() => {
            buttonSize.value = 0.95
            if(pressInFunction) {
              runPressInFunction()
            }
        }}
        onPressOut={() => {
          if(pressOutFunction) {
            runPressOutFunction()
          }
          buttonSize.value = 1
        }}
        >
          <Text style={ tailwind(`text-white font-bold`) }>{ text }</Text>
        </Pressable>
    </Animated.View>
  );
};

export default Button;

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
});
