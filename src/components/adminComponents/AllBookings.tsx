import { IBooked } from "../../models/IBooked";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components-style/adminStyles/_allBookings.scss";

export const AllBookings = (props: IBooked) => {
  //set variables
  const navigate = useNavigate();

  //fetch data and save to send as props to SingleBooking
  const sendData = () => {
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
      <div className="editBtn" onClick={sendData}>
        Ändra
      </div>
    </div>
  );
};
