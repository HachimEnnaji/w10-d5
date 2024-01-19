import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { HAS_ERROR, IS_LOADING } from "../redux/actions";
import Loading from "./Loading";
import OnLoadError from "./OnLoadError";
import { Link } from "react-router-dom";

const Artist = () => {
  const selectedCard = useSelector((state) => state.songsData.specificCard);

  const hasError = useSelector((state) => state.songsData.hasError);
  const isLoading = useSelector((state) => state.songsData.isLoading);

  const dispatch = useDispatch();

  const [songs, setSongs] = useState({});

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        let response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${selectedCard.artist.name}`
        );
        if (response.ok) {
          let data = await response.json();
          setSongs(data);
          console.log(data);
          dispatch({
            type: IS_LOADING,
          });
          console.log(songs);
        } else {
          dispatch({
            type: IS_LOADING,
          });
          dispatch({
            type: HAS_ERROR,
          });
        }
      } catch (error) {
        dispatch({
          type: IS_LOADING,
        });
        dispatch({
          type: HAS_ERROR,
        });
      }
    };
    fetchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container xs={12} md={12} className=" offset-md-3 mainPage">
      <Row className="mb-3">
        <Col md={{ span: 6, offset: 1 }} className="mainLinks d-none d-md-flex ">
          <a href="#" className="mx-2 link">
            TRENDING
          </a>
          <a href="#" className="mx-2 link">
            PODCAST
          </a>
          <a href="#" className="mx-2 link">
            MOODS AND GENRES
          </a>
          <a href="#" className="mx-2 link">
            NEW RELEASES
          </a>
          <a href="#" className="mx-2 link">
            DISCOVER
          </a>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={10} className=" mt-5">
          <h2 className="titleMain">{selectedCard.artist.name}</h2>
          <div id="followers">{selectedCard.rank} Followers</div>
          <div className="d-flex justify-content-center" id="button-container">
            <button className="btn btn-success mr-2 mainButton d-none" id="playButton">
              PLAY
            </button>
            <button className="btn btn-outline-light mainButton d-none" id="followButton">
              FOLLOW
            </button>
          </div>
        </Col>
      </Row>
      <Row className=" mb-3">
        <Col xs={12} md={12} className="   p-0">
          <div className="mt-4 d-flex justify-content-start">
            <h2 className="text-white font-weight-bold">Tracks</h2>
          </div>
          <Row id="apiLoaded">
            {isLoading ? (
              <Loading />
            ) : hasError ? (
              <OnLoadError />
            ) : (
              songs?.data?.map((singl) => (
                <Col xs={4} md={4} key={singl.id} className="my-3">
                  <Link to={"/Album"} className="custom-link">
                    <img src={singl.album.cover_big} alt={singl.album.title} />
                    <p className="mt-2 text-truncate ">Album: {singl.album.title}</p>
                  </Link>
                  <Link to={"/Artist"} className="custom-link">
                    <p>Artist: {singl.artist.name}</p>
                  </Link>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Artist;
