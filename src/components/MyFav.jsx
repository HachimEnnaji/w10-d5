import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { BiPlayCircle } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { REMOVE_FROM_FAV } from "../redux/actions";

const MyFav = () => {
  const myFav = useSelector((state) => state.songsData.myFavSongs);
  const dispatch = useDispatch();

  function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  return (
    <Container className="col-12 col-md-9 offset-md-2 px-5 mainPage">
      <Row className="mb-3">
        <Col md={12} className="mainLinks d-none d-md-flex">
          <Link>TRENDING</Link>
          <Link>PODCAST</Link>
          <Link>MOODS AND GENRES</Link>
          <Link>NEW RELEASES</Link>
          <Link>DISCOVER</Link>
        </Col>
      </Row>
      <Row className="mt-5 d-flex align-items-center ">
        {myFav.map((song, i) => (
          <Container className="fav-card d-flex p-1 rounded">
            <Col
              xs={1}
              className="mt-2 delete"
              onClick={() => {
                dispatch({
                  type: REMOVE_FROM_FAV,
                  payload: i,
                });
              }}
            >
              <RiDeleteBin6Line size={20} />
            </Col>
            <Col xs={2} className="mt-2">
              <img style={{ width: "50px" }} src={song.album.cover_small} alt={song.title} />
            </Col>
            <Col xs={3} className="mt-2">
              <ListGroup>{song.title}</ListGroup>
            </Col>
            <Col xs={3} className="mt-2">
              <ListGroup>{song.artist.name}</ListGroup>
            </Col>
            <Col xs={2} className="mt-2">
              <ListGroup>{formatDuration(song.duration)}</ListGroup>
            </Col>
            <Col xs={1} className="mt-2">
              <ListGroup style={{ fontSize: "1.4em" }}>
                <BiPlayCircle />{" "}
              </ListGroup>
            </Col>
          </Container>
        ))}
      </Row>
    </Container>
  );
};
export default MyFav;
