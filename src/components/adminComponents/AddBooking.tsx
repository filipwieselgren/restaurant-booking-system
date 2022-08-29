import "../../styles/admin.scss";
import "../../styles/components-style/adminStyles/_singleBooking.scss";

export const AddBooking = () => {
  return (
    <>
      <div className="wrapper">
        <div className="adminWrapper">
          <form>
            <h3>Bokningsdetaljer</h3>
            <div className="bookingDiv">
              <div>
                <h3>Antal personer</h3>
                <input type="number" />
              </div>

              <div>
                <h3>Datum</h3>
                <input type="date" />
              </div>

              <div>
                <h3>Tid</h3>

                <select>
                  <option value="18">18</option>

                  <option value="21">21</option>
                </select>
              </div>
            </div>

            <button>hämta tillgängliga tider</button>

            <h3>Personuppgifter</h3>
            <div className="detailsDiv">
              <h3>Namn</h3>
              <input type="text" />
            </div>
            <div className="detailsDiv">
              <h3>E-post</h3>
              <input type="text" />
            </div>
            <div className="detailsDiv">
              <h3>Telefonnummer</h3>
              <input type="text" />
            </div>
            <div className="inputDiv">
              <button>spara ändringar</button>
              <button>ta bort bokning</button>
            </div>
          </form>

          <button>Avbryt</button>
        </div>
      </div>
    </>
  );
};
