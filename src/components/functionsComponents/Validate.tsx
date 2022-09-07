import { StringDecoder } from "string_decoder";
import { PersonData } from "../bookingComponents/PersonData";
import { Bookings } from "../pages/Bookings";

export const Validate = () => {
  const validateLength = (v: string, l: number) => {
    console.log("v o l i validate", v, l);

    if (v.length === l) {
      return true;
    } else {
      return false;
    }
  };

  const validateEmail = (email: string) => {
    let regex = /\S+@\S+\.\S+/.test(email);

    if (regex) {
      return true;
    } else {
      return false;
    }
  };

  return <></>;
};
