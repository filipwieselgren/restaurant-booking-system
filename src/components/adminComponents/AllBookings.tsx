import { IBooking } from "../../models/IBooking";
import "../../styles/components-style/adminStyles/_allBookings.scss";

export const AllBookings = (props: IBooking) => {
  return (
    <div className="listWrapper">
      <div className="listDiv">
        <p>{props.name}</p>
        <p>{props.email}</p>
        <p>{props.phone}</p>
        <p>{props.amountOfPeople}</p>
        <p>{props.date}</p>
        <p>{props.time}</p>
      </div>
    </div>
  );
};
