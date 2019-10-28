export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const CLEAR_IMAGE = "CLEAR_IMAGE";

export const clearImage = () => ({
  type: CLEAR_IMAGE
});

export const receiveImage = image => ({
  type: RECEIVE_IMAGE,
  image
});