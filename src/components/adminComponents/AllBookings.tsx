import { IAdminBookedRender } from "../../models/IAdminBookedProps";
import { Link } from "react-router-dom";
import "../../styles/components-style/adminStyles/_allBookings.scss";

export const AllBookings = (props: IAdminBookedRender) => {
  //only render todays and coming bookings
  if (props.date >= new Date().toLocaleDateString()) {
    return (
      <div className="listDiv">
        <div>
          <p>{props.date}</p>
        </div>
        <div>
          <p className="pWidth">{props.name}</p>
          <p className="pWidth">{props.email}</p>
        </div>
        <div>
          <p className="pShort">{props.amountOfPeople}</p>
        </div>
        <div>
          <p className="pShort">{props.time}</p>
        </div>
        <div>
          <p className="pWidth">{props.phone}</p>
        </div>
        <div className="editBtn">
          <Link to={"/admin/" + props._id}>Edit</Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
