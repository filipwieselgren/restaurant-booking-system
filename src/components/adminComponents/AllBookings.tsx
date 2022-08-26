import { IBooking } from "../../models/IBooking";
import { Link } from "react-router-dom";
import "../../styles/components-style/adminStyles/_allBookings.scss";

export const AllBookings = (props: IBooking) => {
  return (
    <div className="listDiv">
      <p>{props.date}</p>
      <div>
        <p>{props.name}</p>
        <p>{props.email}</p>
      </div>
      <p>{props.amountOfPeople}</p>
      <p>{props.time}</p>
      <p>{props.phone}</p>
      <div className="editBtn">
        <Link to={"/admin/" + props._id}>ändra</Link>
      </div>
    </div>
  );
};
