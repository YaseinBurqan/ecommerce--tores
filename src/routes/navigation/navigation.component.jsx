import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import Logo from "../../assets/logo.jpg";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={Logo} alt="home" height="50px" width="80px" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            HOME
          </Link>

          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          <Link className="nav-link" to="/signin">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
