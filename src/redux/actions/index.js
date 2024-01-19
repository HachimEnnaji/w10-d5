export const POP_CARD = "POP_CARD";
export const HIP_HOP_CARD = "HIP_HOP_CARD";
export const ROCK_CARD = "ROCK_CARD";
export const IS_LOADING = "IS_LOADING";
export const HAS_ERROR = "HAS_ERROR";
export const CARD_ID = "CARD_ID";
export const ALL_TRACKS = "ALL_TRACKS";
export const SPECIFIC_CARD = "SPECIFIC_CARD";
export const PLAY_ALBUM = "PLAY_ALBUM";
export const SEARCH_RESULTS = "SEARCH_RESAULTS";
export const MY_FAV_SONGS = "MY_FAV_SONGS";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";
export const fetchFromMusicApi = (endPoint) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + endPoint
      );
      if (res.ok) {
        let data = await res.json();
        console.log(data.data);
        switch (endPoint) {
          case "rock":
            dispatch({
              type: IS_LOADING,
            });
            dispatch({
              type: ROCK_CARD,
              payload: data.data,
            });
            break;
          case "pop":
            dispatch({
              type: IS_LOADING,
            });
            dispatch({
              type: POP_CARD,
              payload: data.data,
            });
            break;
          case "hiphop":
            dispatch({
              type: IS_LOADING,
            });
            dispatch({
              type: HIP_HOP_CARD,
              payload: data.data,
            });
            break;
          default:
            break;
        }
      } else {
        dispatch({
          type: IS_LOADING,
        });
        dispatch({
          type: HAS_ERROR,
        });
      }
    } catch (error) {
      alert(error);
      dispatch({
        type: IS_LOADING,
      });
      dispatch({
        type: HAS_ERROR,
      });
    }
  };
};
