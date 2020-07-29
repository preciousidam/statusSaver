import actionTypes from './action-types';

export const updateImages = images => ({
    type: actionTypes.UPDATE_IMAGES,
    images,
});

export const delImage = id => ({
    type: actionTypes.DEL_IMAGE,
    id
});

export const delVideo = id => ({
    type: actionTypes.DEL_IMAGE,
    id
});

export const updateVideos = videos => ({
    type: actionTypes.UPDATE_VIDEOS,
    videos,
});

export const setSelectedImage = image => ({
    type: actionTypes.UPDATE_SELECTED_IMAGE,
    image,
});

export const setSelectedVideo = video => ({
    type: actionTypes.UPDATE_SELECTED_VIDEOS,
    video,
});