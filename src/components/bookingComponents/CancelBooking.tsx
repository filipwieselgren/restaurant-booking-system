import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/cancel.scss";

export const CancelBooking = () => {
  const [cancel, setCancel] = useState<string>("");
  const [text, setText] = useState<boolean>(true);
  const [button, setButton] = useState<boolean>(true);

  let params = useParams();

  const cancelBooking = async (id: any) => {
    let response = await axios.delete(
      `http://localhost:8080/admin/cancel/${id}`
    );

    setCancel(response.data);
    setText(false);
    setButton(false);
  };

  let infoText = (
    <div className="info-text">
      Are you sure you want to cancel your booking?
    </div>
  );
  if (text === false) {
    infoText = (
      <div className="info-text">
        Your booking is canceled. We have sent a confirmation to your email.
        Feel free to book a table any other day. 💚
      </div>
    );
  }

  let btn = (
    <button className="cancel-btn" onClick={() => cancelBooking(params.id)}>
      Yes I want to cancel my booking
    </button>
  );

  if (button === false) {
    btn = <></>;
  }

  return (
    <>
      <div className="main-wrapper">
        {infoText}
        {btn}
      </div>
    </>
  );
};
