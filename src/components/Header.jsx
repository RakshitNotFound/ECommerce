import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import logo from "../Images/logo.png";
import { IoIosArrowDropdown } from "react-icons/io";
import "../componentsCSS/Header.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../Shares/ContextFile";
import { AiOutlineLogin } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAccountDropDownOpen, setIsAccountDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { setQuery, isLogIn, name, setIsLogIn } = useAppContext();

  const queryHandler = (event) => {
    setQuery(event.target.value);
  };

  const dropDownHandler = () => {
    if (isDropdownOpen === false) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  const isClickOnAccount = () => {
    if (isAccountDropDownOpen === false) {
      setIsAccountDropDownOpen(true);
    } else {
      setIsAccountDropDownOpen(false);
    }
  };
  const logoutHandler = () => {
    setIsLogIn(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <React.Fragment>
      <div className="all-nav-bar">
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FiMenu />
        </div>

        <div className="logo">
          <img
            src={logo}
            height={50}
            width={100}
            alt="this is images of website logo"
          />
        </div>
        <div className="nav-item">
          <ul className="list">
            <li className="dropdown">
              <button className="item" href="/" onClick={dropDownHandler}>
                Categories
                <IoIosArrowDropdown className="dropdown-icon" />
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ProductList">Earphone</Link>
                  </li>
                  <li>
                    <Link to="/WatchList">Watch</Link>
                  </li>
                  <li>
                    <Link to="/MobileList">Mobile</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a className="other-item" href="#Deals">
                Deals
              </a>
            </li>
            <li>
              <a className="other-item" href="#WhatsNew">
                What's New
              </a>
            </li>
          </ul>
        </div>
        <div className="search-bar">
          <input
            className="input-bar"
            type="text"
            placeholder="Search Product"
            onChange={queryHandler}
          />
          <AiOutlineSearch />
        </div>

        <div className="info">
          {isLogIn ? (
            <div className="account">
              <ul className="list dropdown-list">
                <li className="dropdown">
                  <button className="account-button" onClick={isClickOnAccount}>
                    <MdAccountCircle className="account-icon" />
                    Account
                  </button>
                  {isAccountDropDownOpen && (
                    <ul className="dropdown-menu" style={{ zIndex: "10" }}>
                      <li>
                        <span>{name}</span>
                      </li>
                      <li>
                        <button
                          className="logout-button"
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <div className="login">
              <Link
                to="/signUp"
                className="login-button"
                style={{ textDecoration: "none", color: "black" }}
              >
                <AiOutlineLogin className="login-icon" />
                Login
              </Link>
            </div>
          )}
          <div className="cart">
            <Link
              to="/AddToCart"
              className="cart-button"
              style={{ textDecoration: "none", color: "black" }}
            >
              <BsCart4 className="cart-icon" />
              Cart
            </Link>
          </div>
        </div>
        {/* Mobile Vertical Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-vertical-menu">
            <ul className="vertical-list">
              <li className="vertical-item">
                <a href="#categories" onClick={dropDownHandler}>
                  Categories
                  <IoIosArrowDropdown className="dropdown-icon" />
                </a>
                {isDropdownOpen && (
                  <ul className="vertical-dropdown-menu">
                    <li>
                      <Link to="/ProductList">Earphone</Link>
                    </li>
                    <li>
                      <Link to="/WatchList">Watch</Link>
                    </li>
                    <li>
                      <Link to="/MobileList">Mobile</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="vertical-item">
                <a href="#Deals">Deals</a>
              </li>
              <li className="vertical-item">
                <a href="#WhatsNew">What's New</a>
              </li>
              {isLogIn ? (
                <li className="vertical-item">
                  <button className="login-button" onClick={isClickOnAccount}>
                    <MdAccountCircle className="account-icon" />
                    Account
                  </button>
                  {isAccountDropDownOpen && (
                    <ul className="vertical-dropdown-menu">
                      <li>
                        <span className="user-name">{name}</span>
                      </li>
                      <li>
                        <button
                          className="logout-button"
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li className="vertical-item">
                  <Link
                    to="/signUp"
                    className="login-button"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <AiOutlineLogin className="login-icon" />
                    Login
                  </Link>
                </li>
              )}
              <li className="vertical-item">
                <Link
                  to="/AddToCart"
                  className="cart-button"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <BsCart4 className="cart-icon" />
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Header;
