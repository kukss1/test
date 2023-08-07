import { useContext } from "react";
import { Context } from "../../ContextStore";
import { NavLink } from "react-router-dom";
import {
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";


import "./Header.css";

function Header() {
  const { userData, setUserData } = useContext(Context);

  return (
    <div className="header_wrapper">
      <div className="header_container">
        <div className="logo">
          <NavLink to="/">
            <h1 className="parts">Parts</h1>
            <h1 className="hub">Hub</h1>
          </NavLink>
        </div>
        <div className="header_container_rightSide">
          {userData ? (
            <nav className="logged_in_nav_wrapper">
              <NavLink className="nav_item" to="/add-product">
                <span title="Add a sell">
                  <BsFillPlusCircleFill />
                </span>
              </NavLink>

              <div className="dropdown">
                <img
                  className="navImg"
                  src={userData.avatar}
                  alt="user-avatar"
                />
                <div className="dropdown-content">
                  <NavLink
                    className="dropdown-item"
                    to={`/profile/${userData._id}`}
                  >
                    <BsFillPersonFill />
                   <p>Անձնական Էջ</p> 
                  </NavLink>

                  <NavLink className="dropdown-item" to="/messages">
                    <BsFillEnvelopeFill />
                   <p>Նամակներ</p> 
                  </NavLink>

                  <NavLink
                    className="dropdown-item"
                    to="/auth/logout"
                    onClick={() => {
                      setUserData(null);
                    }}
                  >
                    <IoLogOut />
                    <p>Դուրս գալ</p>
                  </NavLink>
                </div>
              </div>
            </nav>
          ) : (
            <nav className="logIn_wrapper">
              <NavLink
                className="signIn_nav_item"
                id="nav-sign-in"
                to="/auth/login"
              >
                Մուտք
              </NavLink>
              <NavLink
                className="signUp_nav_item"
                id="nav-sign-up"
                to="/auth/register"
              >
                Գրանցվել
              </NavLink>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
