import { Link, useNavigate } from "react-router-dom";

const NotFound = ({ spacings }) => {
  const navigate = useNavigate();
  console.log(navigate);

  return (
    <div className={`text-center ${spacings}`}>
      <h2>404 - Pagina non trovata</h2>
      <p className="text-white">
        La risorsa richiesta non esiste, <Link to="/">torna indietro</Link>.
      </p>
      <button
        className="radius-2"
        onClick={() => {
          navigate("/");
        }}
      >
        Torna indietro
      </button>
    </div>
  );
};

export default NotFound;
