import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { ALL_TRACKS, HAS_ERROR, IS_LOADING, MY_FAV_SONGS, PLAY_ALBUM } from "../redux/actions";
import { useEffect } from "react";
import Loading from "./Loading";
import OnLoadErorr from "./OnLoadError";
import { BiStar } from "react-icons/bi";
import { Link } from "react-router-dom";

const Album = () => {
  const specific = useSelector((state) => state?.songsData?.specificCard);
  const isLoading = useSelector((state) => state?.songsData?.isLoading);
  const tracklist = useSelector((state) => state?.songsData?.tracks);
  const hasError = useSelector((state) => state?.songsData?.hasError);
  const dispatch = useDispatch();
  function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  const [starStates, setStarStates] = useState(Array(tracklist.length).fill(false));

  const handleFavClick = (index) => {
    const newStarStates = [...starStates];
    newStarStates[index] = !newStarStates[index];
    setStarStates(newStarStates);
  };
  const handleClick = () => {
    dispatch({
      type: PLAY_ALBUM,
      payload: tracklist,
    });
  };
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${specific.album.id} `);
        if (res.ok) {
          let data = await res.json();
          console.log(data);
          dispatch({
            type: ALL_TRACKS,
            payload: data,
          });
          dispatch({
            type: IS_LOADING,
          });
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
    fetchAlbum();
  }, []);

  return (
    <div>
      <Container className="col-12 col-md-9 offset-md-3 mainPage">
        <Row className="mb-3">
          <Col md={12} className="mainLinks d-none d-md-flex">
            <a className="link" href="#">
              TRENDING
            </a>
            <a className="link" href="#">
              PODCAST
            </a>
            <a className="link" href="#">
              MOODS AND GENRES
            </a>
            <a className="link" href="#">
              NEW RELEASES
            </a>
            <a className="link" href="#">
              DISCOVER
            </a>
          </Col>

          {isLoading ? (
            <Loading />
          ) : hasError ? (
            <OnLoadErorr />
          ) : (
            <>
              <Row className="mb-3 d-flex">
                <Col md={12} className=" ms-5 pt-5 text-center sticky-top" id="img-container">
                  <img
                    className=" mt-5"
                    style={{ top: "50px" }}
                    src={specific?.album?.cover_medium}
                    alt={specific?.album?.title_short}
                  />
                  <p className=" mt-3">{specific?.album?.title}</p>
                  <Link to={"/Artist"}>
                    <p className=" " style={{ top: "20px" }}>
                      {specific?.artist?.name}
                    </p>
                  </Link>
                  <Button
                    style={{
                      borderRadius: "40px",
                      backgroundColor: "#28a745",
                      width: "160px",
                      height: "50px",
                      color: "white",
                      marginTop: "10px",
                      fontSize: "1em",
                      fontWeight: "bold",
                      position: "fixed",
                      left: "360px",
                    }}
                    onClick={handleClick}
                    class="btn"
                  >
                    Play
                  </Button>
                </Col>{" "}
              </Row>
              <Row style={{ marginLeft: "50px" }}>
                <Col className="px-md-5">
                  {tracklist.tracks?.data.map((title, index) => (
                    <Row key={title.id} className="mb-5 mt-2 m-5" id="trackList">
                      <Col xs={1}>
                        <BiStar
                          style={{
                            fontSize: "1.2em",
                            color: starStates[index] ? "gold" : "white",
                          }}
                          onClick={() => {
                            handleFavClick(index);
                            dispatch({
                              type: MY_FAV_SONGS,
                              payload: title,
                            });
                          }}
                        />
                      </Col>
                      <Col xs={10}> {title.title} </Col>
                      <Col xs={1}>{formatDuration(title.duration)} </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Album;
