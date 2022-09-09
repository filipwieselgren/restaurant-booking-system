import { IAdminBookedRender } from "../../models/IAdminBookedProps";
import { Link } from "react-router-dom";
import "../../styles/components-style/adminStyles/_allBookings.scss";

interface IAdminProps {
  adminSearch: IAdminBookedRender[];
}

export const AllBookings = (props: IAdminProps) => {
  return (
    <>
      <div className="listWrapper">
        <table>
          <tr>
            <th className="dateTh">Date</th>
            <th className="emailTh">Email</th>
            <th className="emptyTh"> </th>
            <th className="amtTh">Amt</th>
            <th className="timeTh">Time</th>
          </tr>
          {props.adminSearch.map((booking) => {
            if (booking.date >= new Date().toLocaleDateString()) {
              return (
                <tr className="listRow" key={booking._id}>
                  <td className="dateTd">{booking.date}</td>
                  <td className="emailTd">{booking.email}</td>
                  <td className="emptyTd"></td>
                  <td className="amountTd">{booking.amountOfPeople}</td>
                  <td className="timeTd">{booking.time}</td>

                  <button className="btnTd">
                    <Link to={"/admin/" + booking._id}>
                      <p>Edit</p>
                    </Link>
                  </button>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </>
  );
};
