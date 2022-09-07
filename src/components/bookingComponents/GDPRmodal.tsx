import React, { useState } from "react";
import "../../styles/components-style/bookingStyles/_modal.scss";

export const GdprModal = () => {
  const [showingModal, setShowingModal] = useState<Boolean>(true);

  const closeModal = () => {
    setShowingModal(false);
  };

  return (
    <>
      {showingModal ? (
        <div className="modalWrapper">
          <div className="headDiv">
            <h5>Our GDPR-policy</h5>
          </div>
          <div className="textDiv">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              mollitia quos inventore. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Commodi mollitia quos inventore. Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </p>
            <p>
              Commodi mollitia quos inventore. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Commodi mollitia quos inventore.
            </p>
          </div>
          <div className="closeDiv">
            <div className="closeBtn" onClick={closeModal}>
              Close
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
