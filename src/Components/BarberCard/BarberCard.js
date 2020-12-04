import React, { useState, useEffect } from "react";
import { helpers } from "../../common/helpers";
import "./BarberCard.scss";

const BarberCard = ({
  photo,
  firstName,
  lastName,
  clickHandler,
  isSelected,
}) => {

  lastName = helpers.getFirstLetterOfSurname(lastName);

  return (
    <div
      onClick={clickHandler}
      className={
        "barber-card card " +
        (isSelected ? "barber-card--isSelected" : "null")
      }
    >
      <div className="barber-card__container">
        <img src={photo} className="barber-card__photo"></img>
        <div className="barber-card__name">
          {firstName} {lastName}
        </div>
        <div className="barber-card__available-today">Available today</div>
        <div className="barber-card__line"></div>
        <div className="barber-card__about">About {firstName}</div>
      </div>
    </div>
  );
};

export { BarberCard };
