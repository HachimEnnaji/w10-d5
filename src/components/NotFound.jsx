import { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = ({ spacings }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`text-center ${spacings} dark`}>
      <Alert variant="dark" className="opacity-75 alert">
        <h2 className="h1">404 - Not Found</h2>
        <h2 className="display-3">The page you are looking for does not exist.</h2>
        <h3 className="display-3 ">Please click the button below if you are not redirected within a few seconds</h3>
        <Button variant="dark" className="opacity-100" onClick={() => navigate("/")}>
          Go back to Home
        </Button>
      </Alert>
    </div>
  );
};

export default NotFound;
