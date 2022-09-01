import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAdminBookedProps } from "../../models/IAdminBookedProps";

export const CancelBooking = () => {
  const [cancel, setCancel] = useState("");

  let params = useParams();

  //   useEffect(() => {
  //     console.log(params.id);

  //     test(params.id);
  //   }, []);

  const test = async (id: any) => {
    console.log("Test");

    console.log(`http://localhost:8080/admin/cancel/${id}`);

    let response = await axios.delete(
      `http://localhost:8080/admin/cancel/${id}`
    );

    setCancel(response.data);
  };

  console.log(cancel);

  return (
    <>
      <button onClick={() => test(params.id)}>Cancel</button>
    </>
  );
};
