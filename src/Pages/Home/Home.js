import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageContainer } from "../../Components/PageContainer/PageContainer"
import "./Home.scss"

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "CLEAR_BARBER" });
    dispatch({ type: "CLEAR_SERVICE" });
    dispatch({ type: "CLEAR_FLOW" });
    dispatch({ type: "CLEAR_CART_ITEMS" });
  });

  const handleOnClick = (path) => {
    dispatch({
      type: "SET_FLOW",
      payload: path
    });
    history.push("/" + path);
  }

  return (
    <div className="home--container">
      <PageContainer>
        <div className="brand-container">
          <div className="brand-title container">
            <div className="brand-title">X-CUTZ</div>
            <div className="brand-title">Barbershop</div>
          </div>
          <div className="brand-address container">
            <div className="brand-address">4791 Lowndes Hill Park Road</div>
            <div className="brand-address">Bakersfield, CA 93307</div>
          </div>
          <div className="flow-button--container">
            <button className="flow-button" onClick={() => handleOnClick("services")}>Choose a service</button>
            <button className="flow-button" onClick={() => handleOnClick("barbers")}>Choose a barber</button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export { Home };
