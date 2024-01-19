import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFromMusicApi } from "../redux/actions";
import Loading from "./Loading";
import SingleCard from "./SingleCard";
import OnLoadErorr from "./OnLoadError";

const HipHopCard = ({ endPoint }) => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.songsData.cardSong.hiphop);

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
        cards.slice(0, 4).map((singl) => <SingleCard key={singl.id} singCrd={singl} />)
      )}
    </>
  );
};
export default HipHopCard;
