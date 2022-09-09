import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <section className="footerContainer">
      <article className="linksContainer">
        <Link className="linkFooter" to="/contact">
          FAQ
        </Link>
        <Link className="linkFooter" to="/contact">
          GDPR
        </Link>
        <Link className="linkFooter" to="/contact">
          CONTACT
        </Link>
      </article>
      <article className="iconsContainer">
        <div>
          <i className="fa-brands fa-square-instagram"></i>
        </div>
        <div>
          <i className="fa-brands fa-square-facebook"></i>
        </div>
        <div>
          <i className="fa-brands fa-linkedin"></i>
        </div>
      </article>
      <article className="infoContainer">
        <p>&copy; 2015 LEON</p>
        <p>SITE BY GRUPP 9 FED21S</p>
        <p>TERMS AND CONDITIONS | PRIVACY | LEGAL NOTICE</p>
      </article>
    </section>
  );
};
