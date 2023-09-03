import { useContext } from "react";
import { Context } from "../../ContextStore";
import { NavLink } from "react-router-dom";
import {
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsFillPlusCircleFill,
  BsWhatsapp,
  BsTelegram,
} from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import logo from "../../Logos/Logo_New_Web.webp";

import "./Header.css";

function Header() {
  const { userData, setUserData } = useContext(Context);

  return (
    <div className="header_wrapper">
      <div className="header_container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        <nav className="support_nav">
          <h3>
            <BiSupport />
            24/7 Աջակցություն
          </h3>
          <div className="nav_support_links">
            <a
              href="https://wa.me/+37495166622"
              target="blank"
              rel="noreferrer"
              className="whatsapp"
            >
              <BsWhatsapp />
              <p>Whatsapp</p>
            </a>
            <a
              href="http://t.me/torosyan1666"
              target="blank"
              rel="noreferrer"
              className="telegram"
            >
              <BsTelegram />

              <p>Telegram</p>
            </a>
          </div>
        </nav>

        <div className="header_container_rightSide">
          {userData ? (
            <nav className="logged_in_nav_wrapper">
              <NavLink className="nav_item" to="/add-product">
                <span title="Add_a_sell" className="add_a_sell">
                  <BsFillPlusCircleFill />
                  <p>Ավելացնել Հայտարարություն</p>
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
