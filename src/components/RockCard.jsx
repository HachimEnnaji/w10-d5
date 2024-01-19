import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFromMusicApi } from "../redux/actions";

import SingleCard from "./SingleCard";
import OnLoadErorr from "./OnLoadError";
import Loading from "./Loading";

const RockCard = ({ endPoint }) => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.songsData.cardSong.rock);

  const hasError = useSelector((state) => state.songsData.hasError);
  const isLoading = useSelector((state) => state.songsData.isLoading);

  useEffect(() => {
    dispatch(fetchFromMusicApi(endPoint));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : hasError ? (
        <OnLoadErorr />
      ) : (
        cards.slice(11, 15).map((singl) => <SingleCard key={singl.id} singCrd={singl} />)
      )}
    </>
  );
};
export default RockCard;
