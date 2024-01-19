import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import shuffle from "../assets/Shuffle.png";
import Play from "../assets/Play.png";
import Previuos from "../assets/Previous.png";
import Repeat from "../assets/Repeat.png";
import Next from "../assets/Next.png";

const MyPlayer = () => {
  const tracklist = useSelector((state) => state?.songsData?.playAlbum);
  return (
    <Container fluid className="fixed-bottom bg-container pt-1 ">
      <Row>
        <Col sm={8} className="offset-lg-2">
          <Row className="d-flex justify-content between">
            <Col xs={6} md={4} lg={2} className="offset-3 offset-md-4 offset-lg-5 playerControls mt-1">
              <Link href="#">
                <img src={shuffle} alt="shuffle" className="mx-1 d-inline-block" />
              </Link>
              <Link href="#">
                <img src={Previuos} alt="previous" className="mx-1 d-inline-block" />
              </Link>
              <Link href="#">
                <img src={Play} alt="play" className="mx-1 d-inline-block" />
              </Link>
              <Link href="#">
                <img src={Next} alt="next" className="mx-1 d-inline-block" />
              </Link>
              <Link href="#">
                <img src={Repeat} alt="repeat" className="mx-1 d-inline-block" />
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center playBar py-3">
            <Col xs={8} md={6}>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPlayer;
