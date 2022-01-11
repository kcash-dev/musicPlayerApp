import { NEXT_SONG, PREVIOUS_SONG, PICK_SONG, SET_PLAYING, SET_SOUND } from "./taskTypes";

export const nextSong = (song) => ({
    type: NEXT_SONG,
    payload: song
})

export const previousSong = (song) => ({
    type: PREVIOUS_SONG,
    payload: song
})

export const pickSong = (song, sound) => ({
    type: PICK_SONG,
    payload: {
        song: song,
        sound: sound
    }
})

export const setPlaying = (playStatus) => ({
    type: SET_PLAYING,
    payload: playStatus
})