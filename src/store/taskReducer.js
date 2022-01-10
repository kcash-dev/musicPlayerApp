import { NEXT_SONG, PREVIOUS_SONG, PICK_SONG, SET_PLAYING } from "./taskTypes";
import { songList } from "../../assets/songList";
const initialState = { 
    library: songList,
    isPlaying: false,
    currentSong: null
}

const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PLAYING:
            return {
                ...state,
                isPlaying: action.payload
            }
        case PICK_SONG:
            return {
                ...state,
                currentSong: action.payload
            }
        case NEXT_SONG:
            return {}
        case PREVIOUS_SONG:
            return {}
        default:
            return state;
    }
}

export default taskReducer