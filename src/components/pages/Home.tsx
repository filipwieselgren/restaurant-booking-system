import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const Home = () => {
  return (
    <div className="homeWrapper">
      <Link to={"/booktable/searchtables"}>
        <button className="bookButton">
          <p>Book table</p>
        </button>
      </Link>
    </div>
  );
};
