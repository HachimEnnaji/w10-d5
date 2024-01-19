import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Spotify_Logo.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { SEARCH_RESULTS } from "../redux/actions";
import { Link, NavLink } from "react-router-dom";
const MyNavBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <Navbar bg="navbar" variant="white" expand="md" fixed="left">
      <Navbar.Brand href={"/"}>
        <img src={logo} alt="Spotify_Logo" width={131} height={40} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
      <Navbar.Collapse id="navbarNavAltMarkup" className="px-2">
        <Nav className="mr-auto d-block ">
          <Nav.Link href={"/"}>
            <FontAwesomeIcon icon={faHome} size="lg" /> Home
          </Nav.Link>
          <Nav.Link href="/MyFavourite">
            <FontAwesomeIcon icon={faBookOpen} size="lg" /> Your Library
          </Nav.Link>
        </Nav>
        <Form className="input-group m-1">
          <FormControl type="text" placeholder="Search" className="mr-sm-2 " id="searchField" onChange={handleSearch} />

          <Link to={"/SearchResults"}>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() =>
                dispatch({
                  type: SEARCH_RESULTS,
                  payload: search,
                })
              }
              id="button-addon1"
            >
              GO
            </Button>
          </Link>
        </Form>
      </Navbar.Collapse>
      <div className="nav-btn">
        <Button className="signup-btn" variant="success">
          Sign Up
        </Button>
        <Button className="login-btn" variant="outline-success">
          Login
        </Button>
        <div className="d-block">
          <a href="/">Cooke Policy</a> | <a href="/">Privacy</a>
        </div>
      </div>
    </Navbar>
  );
};
export default MyNavBar;
