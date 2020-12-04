import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.scss";
import { CartItem } from "../CartItem/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const selectedCartItems = useSelector((state) => state.cartItems);

  useEffect(() => {
    const onMount = async () => {
      setCartItems(selectedCartItems);
    };
    onMount();
  });

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__title">Your Order</div>
        {cartItems.map((item, index) => {
          return (
            <CartItem
              key={item.barberId + "-" + item.serviceId}
              barberFirstName={item.barberFirstName}
              barberLastName={item.barberLastName}
              serviceCurrency={item.serviceCurrency}
              servicePrice={item.servicePrice}
              serviceName={item.serviceName}
              index={index}
            />
          );
        })}
      </div>
      <button className="cart__button">Choose a time</button>
    </div>
  );
};

export { Cart };
