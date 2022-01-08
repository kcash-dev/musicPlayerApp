import { NEXT_SONG, PREVIOUS_SONG, PICK_SONG } from "./taskTypes";

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