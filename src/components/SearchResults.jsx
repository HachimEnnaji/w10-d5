import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { HAS_ERROR, IS_LOADING, SPECIFIC_CARD } from "../redux/actions";
import Loading from "./Loading";

import { Link } from "react-router-dom";
import OnLoadErorr from "./OnLoadError";

const SearchResaults = () => {
  const searchResult = useSelector((state) => state.songsData.searchResult);
  const hasError = useSelector((state) => state.songsData.hasError);
  const isLoading = useSelector((state) => state.songsData.isLoading);

  const dispatch = useDispatch();

  const [songs, setSongs] = useState({});

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchResult}`);
        if (response.ok) {
          let data = await response.json();
          setSongs(data);
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
    fetchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

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

      <Row className=" mb-3">
        <Col xs={12} md={12} className="   p-0">
          <h2 className="text-white font-weight-bold mt-4">Search Results</h2>
          <h4 className="mt-4">{typeof searchResult === "string" ? searchResult.toUpperCase() : ""} </h4>

          <Row id="apiLoaded">
            {isLoading ? (
              <Loading />
            ) : hasError ? (
              <OnLoadErorr />
            ) : (
              songs?.data?.map((singl) => (
                <Col xs={4} md={4} key={singl.id} className="my-3">
                  <Link
                    to={"/Album"}
                    onClick={() => {
                      dispatch({
                        type: SPECIFIC_CARD,
                        payload: singl,
                      });
                    }}
                  >
                    <img src={singl.album.cover_big} alt={singl.album.title} />
                    <p className="mt-2 text-truncate ">Album: {singl.album.title}</p>
                  </Link>
                  <Link
                    to={"/Artist"}
                    onClick={() => {
                      dispatch({
                        type: SPECIFIC_CARD,
                        payload: singl,
                      });
                    }}
                  >
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
export default SearchResaults;
