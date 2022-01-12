import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';

export const init = async (defaultConfigs = {}) => {
	try {
		const configs = {
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			playThroughEarpieceAndroid: false,
			...defaultConfigs,
		};

		await Audio.setAudioModeAsync(configs);
	} catch (error) {

	}
};

export const playSound = async () => {
    const currentSong = useSelector(state => state.currentSong)

    const { sound } = await Audio.Sound.createAsync(
       currentSong.trackUrl
    );
    setSound(sound);

    await sound.playAsync(); 
}

export const pause = async () => {
    
}