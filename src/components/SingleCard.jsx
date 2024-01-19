import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CARD_ID, SPECIFIC_CARD } from "../redux/actions";

const SingleCard = ({ singCrd }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Col xs={4}>
        <Link
          to={`/Album`}
          onClick={() => {
            dispatch({
              type: CARD_ID,
              payload: singCrd.id,
            });
            dispatch({
              type: SPECIFIC_CARD,
              payload: singCrd,
            });
          }}
        >
          <img src={singCrd.album.cover} alt={singCrd.title} style={{ height: "200px" }} />
        </Link>
        <p className="text-truncate mt-2">{singCrd.title}</p>

        <p>{singCrd.artist.name}</p>
      </Col>
    </>
  );
};

export default SingleCard;
