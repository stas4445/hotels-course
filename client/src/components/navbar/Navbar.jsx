import "./navbar.css";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    // if (user) {
    //   localStorage.removeItem('user');
    // } else {
      navigate("/login");
    // }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <FontAwesomeIcon className="navbarIcon" icon={faMapLocationDot} />
          <span className="logo">Hotels</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button onClick={handleClick} className="navButton">
              Войти
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
