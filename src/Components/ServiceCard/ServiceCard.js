import React from 'react';
import './ServiceCard.scss';

const ServiceCard = ({ name, price, currency, duration, clickHandler,  isSelected }) => {

  const convertMinutesToHours = (duration) => {
    if (duration < 60) return `${duration} min`;

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} hr and ${minutes} min`;
  };

  const convertCurrency = (currency) => {
    switch (currency) {
      case "usd":
        return "$";
      default:
        return currency;
    }
  }
  duration = convertMinutesToHours(duration);
  currency = convertCurrency(currency);

  return (
    <div className={"service-card card " + (isSelected ? "service-card--isSelected" : "null")} onClick={clickHandler}>
      <div className="flex-container">
        <div className="service-card__name">{name}</div>
      </div>
      <div className="flex-container service-card__duration-price-container" >
        <div className="service-card__duration">{duration}</div>
        <div className="service-card__price">{currency}{price}</div>
      </div>
    </div>
  );
};

export { ServiceCard };
