import React, { useState, useEffect } from "react";
import "./CartItem.scss";

const CartItem = ({
  barberFirstName,
  barberLastName,
  serviceCurrency,
  servicePrice,
  serviceName,
  index,
}) => {
  return (
    <div className="cart-item">
      <div className="flex-container cart-item__name-price-container">
        <div className="cart-item__barber-name">
          <span className="cart-item__number">{index + 1}</span>
          {barberFirstName} {barberLastName}
        </div>
        <div className="cart-item__currency-price">
          {serviceCurrency}
          {servicePrice}
        </div>
      </div>
      <div className="cart-item__service-name">{serviceName}</div>
    </div>
  );
};

export { CartItem };
