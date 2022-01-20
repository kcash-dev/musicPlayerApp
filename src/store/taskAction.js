import { NEXT_SONG, PREVIOUS_SONG, PICK_SONG, SET_PLAYING, SET_SOUND, SET_PLAYLIST } from "./taskTypes";

export const nextSong = (song) => ({
    type: NEXT_SONG,
    payload: song
})

export const previousSong = (song) => ({
    type: PREVIOUS_SONG,
    payload: song
})

export const pickSong = (song) => ({
    type: PICK_SONG,
    payload: song
})

export const setPlaying = (playStatus) => ({
    type: SET_PLAYING,
    payload: playStatus
})

export const setPlaylist = (playlist) => ({
    type: SET_PLAYLIST,
    payload: playlist
})