import actionTypes from './action-types';
import {combineReducers} from 'redux';

const imageState = [];
const videoState = [];
const selectedState = {video: null, image: null};

export const videos = (state = videoState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_VIDEOS: {
            state = videoState
            return [...state,...action.videos];
        }
        case actionTypes.DEL_VIDEO: {
            let filtered = state.filter((video, id) => id !== action.id )
            return filtered;
        }
        default: {
            return state;
        }
    }
}

export const images = (state = imageState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_IMAGES: {
            state = imageState
            return [...state,...action.images];
        }
        case actionTypes.DEL_IMAGE: {
            let filtered = state.filter((image, id) => id !== action.id )
            return filtered;
        }
        default: {
            return state;
        }
    }
}

export const selected = (state = selectedState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_SELECTED_IMAGE: {
            return {...state, image: action.image};
        }
        case actionTypes.UPDATE_SELECTED_VIDEOS: {
            return {...state, video: action.video};
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({selected,images,videos});