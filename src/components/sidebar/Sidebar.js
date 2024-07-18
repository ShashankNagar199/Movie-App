import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../sidebar/Sidebar.css";
import { logout } from "../../store/actions/userAuthActions";
import userIcon from "../images/user-image.png";
import { resetMovies } from "../../store/actions/movieOperationsActions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userAuth.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetMovies());
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={`hamburger-menu ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Movie App</h2>
        {user && (
          <div className="user-info-box">
            <img className="user-image" src={userIcon} alt="User Icon" />
            <div className="user-email" title={user.email}>
              {user.email}
            </div>
          </div>
        )}
        <ul>
          <li>
            <Link to="/search">Home</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
