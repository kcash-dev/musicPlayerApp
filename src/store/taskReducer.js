import { NEXT_SONG, PREVIOUS_SONG, PICK_SONG } from "./taskTypes";
import { songList } from "../../assets/songList";
const initialState = { library: songList }

const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case PICK_SONG:
            return {}
        case NEXT_SONG:
            return {}
        case PREVIOUS_SONG:
            return {}
        default:
            return state;
    }
}

export default taskReducer