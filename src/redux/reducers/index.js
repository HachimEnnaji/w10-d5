import {
  ROCK_CARD,
  POP_CARD,
  HIP_HOP_CARD,
  IS_LOADING,
  HAS_ERROR,
  CARD_ID,
  SPECIFIC_CARD,
  ALL_TRACKS,
  PLAY_ALBUM,
  SEARCH_RESULTS,
  MY_FAV_SONGS,
  REMOVE_FROM_FAV,
} from "../actions";

const initialState = {
  cardSong: {
    pop: [],
    rock: [],
    hiphop: [],
  },
  specificCard: {},
  hasError: false,
  isLoading: true,
  cardId: null,
  tracks: {},
  playAlbum: {},
  searchResult: "",
  myFavSongs: [],
};

const CardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_ALBUM:
      return {
        ...state,
        playAlbum: action.payload,
      };
    case ALL_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    case MY_FAV_SONGS:
      return {
        ...state,
        myFavSongs: [...state.myFavSongs, action.payload],
      };
    case REMOVE_FROM_FAV:
      return {
        ...state,
        myFavSongs: state.myFavSongs.filter((_, i) => i !== action.payload),
      };
    case ROCK_CARD:
      return {
        ...state,
        cardSong: { ...state.cardSong, rock: action.payload },
      };
    case SPECIFIC_CARD:
      return {
        ...state,
        specificCard: action.payload,
      };
    case POP_CARD:
      return {
        ...state,
        cardSong: { ...state.cardSong, pop: action.payload },
      };
    case HIP_HOP_CARD:
      return {
        ...state,
        cardSong: { ...state.cardSong, hiphop: action.payload },
      };

    case IS_LOADING:
      return { ...state, isLoading: false };
    case HAS_ERROR:
      return { ...state, hasError: true };
    case CARD_ID:
      return { ...state, cardId: action.payload };
    case SEARCH_RESULTS:
      return { ...state, searchResult: action.payload };

    default:
      return state;
  }
};
export default CardsReducer;
