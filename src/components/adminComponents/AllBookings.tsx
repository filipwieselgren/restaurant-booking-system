import { IAdminBookedRender } from "../../models/IAdminBookedProps";
import { Link } from "react-router-dom";
import "../../styles/components-style/adminStyles/_allBookings.scss";

interface IAdminProps {
  adminRender: IAdminBookedRender[];
}

export const AllBookings = (props: IAdminProps) => {
  let renderHTML = <></>;

  if (props.adminRender.length >= 1) {
    renderHTML = (
      <div>
        {props.adminRender.map((booking) => {
          if (booking.date >= new Date().toLocaleDateString()) {
            return (
              <div key={booking._id}>
                <div className="listDiv">
                  <div>
                    <p>{booking.date}</p>
                  </div>
                  <div>
                    <p className="pWidth">{booking.name}</p>
                    <p className="pWidth">{booking.email}</p>
                  </div>
                  <div>
                    <p className="pShort">{booking.amountOfPeople}</p>
                  </div>
                  <div>
                    <p className="pShort">{booking.time}</p>
                  </div>
                  <div>
                    <p className="pWidth">{booking.phone}</p>
                  </div>
                  <div className="editBtn">
                    <Link to={"/admin/" + booking._id}>Edit</Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    renderHTML = (
      <>
        <h3>no bookings to manage!</h3>
      </>
    );
  }

  return <>{renderHTML}</>;
};
