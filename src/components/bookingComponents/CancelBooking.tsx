import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/cancel.scss";

export const CancelBooking = () => {
  const [cancel, setCancel] = useState<string>("");
  const [text, setText] = useState<boolean>(true);

  let params = useParams();

  //   useEffect(() => {
  //     console.log(params.id);

  //     test(params.id);
  //   }, []);

  const test = async (id: any) => {
    console.log("Test");

    let response = await axios.delete(
      `http://localhost:8080/admin/cancel/${id}`
    );

    setCancel(response.data);
    setText(false);
  };

  let infoText = (
    <div className="info-text">
      Are you sure you want to cancel your booking?
    </div>
  );
  if (text === false) {
    infoText = (
      <div className="info-text">
        Your booking is canceled. We have sent a confirmation to your email and
        feel free to book a table at us any other day. 💚
      </div>
    );
  }

  return (
    <>
      <div className="main-wrapper">
        {infoText}
        <button className="cancel-btn" onClick={() => test(params.id)}>
          Yes I want to cancel my booking
        </button>
      </div>
    </>
  );
};
