import React from "react";
import "../../styles/pages/menu.scss";

export const Menu = () => {
  return (
    <div className="foodMenuWrapper">
      <div className="menuDiv">
        <h1>MENU</h1>

        <div className="divWrapper">
          <div className="dinnerDiv">
            <h4>Dinner</h4>
            <ul>
              <li>Meat balls with savoy cabbage</li>
              <li>Rose mary ham</li>
              <li>Mustard ham with greens</li>
              <li>Salmon á la green lentils</li>
              <li>Roasted beets with cheese</li>
            </ul>
          </div>
          <div className="drinksDiv">
            <h4>Drinks</h4>
            <ul>
              <li>Margarita</li>
              <li>Mojito pink</li>
              <li>Almond delishiosa</li>
              <li>Gin & Tonic</li>
              <li>Amaretto Sour</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
