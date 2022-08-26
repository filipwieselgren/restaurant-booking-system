import { IBooking } from "../../models/IBooking";
import { useNavigate } from "react-router-dom";
import "../../styles/components-style/adminStyles/_allBookings.scss";

export const AllBookings = (props: IBooking) => {
  //set variables
  const navigate = useNavigate();

  //function for getting API with booking-info + redirecting
  const sendDate = () => {
    fetch("http://localhost:8080/admin/" + props.date)
      .then((response) => response.json())
      .then((data) => console.log(data));

    navigate("/admin/" + props._id);
  };

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
      <div className="editBtn" onClick={sendDate}>
        Ändra
      </div>
    </div>
  );
};
