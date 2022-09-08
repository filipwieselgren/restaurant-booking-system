import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../styles/layout/navigation.scss";
const logoImg = require("../../assets/logo.png");

export const Navigation = () => {
  const url = useLocation();
  const [adminText, setAdminText] = useState<Boolean>(false);

  useEffect(() => {
    if (url.pathname === "/") {
      setAdminText(false);
    } else {
    }
  }, [url.pathname]);

  const hideText = () => {
    setAdminText(true);
  };

  return (
    <div className="navWrapper">
      <div className="loginWrapper">
        {adminText ? (
          <></>
        ) : (
          <Link to={"/admin/login"}>
            <div className="loginBtn" onClick={hideText}>
              Admin? Log in here!
            </div>
          </Link>
        )}
      </div>
      <div className="logonmenu">
        <div className="logoWrapper">
          <Link to={"/"}>
            <div className="logo">
              <img className="logoImg" src={logoImg} alt="logotype" />
            </div>
          </Link>
        </div>
        <div className="menuWrapper">
          <Link to={"/menu"}>
            <div className="menuBtn">Our menu</div>
          </Link>
          <Link to={"/contact"}>
            <div className="contactBtn">Contact us</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
