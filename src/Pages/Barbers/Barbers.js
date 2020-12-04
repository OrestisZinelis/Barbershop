import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarberCard } from "../../Components/BarberCard/BarberCard";
import { useHistory } from "react-router-dom";
import "./Barbers.scss";
import { Cart } from "../../Components/Cart/Cart";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { helpers } from "../../common/helpers";

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const selectedService = useSelector((state) => state.service);
  const selectedFlow = useSelector((state) => state.flow);
  const selectedCartItems = useSelector((state) => state.cartItems);
  const history = useHistory();

  useEffect(() => {
    const onMount = async () => {
      const barbers = await (await fetch("/api/barbers")).json();
      if (selectedService) {
        for (
          let barberIndex = barbers.length - 1;
          barberIndex >= 0;
          barberIndex--
        ) {
          const barber = barbers[barberIndex];
          const hasService =
            barber.services.findIndex(
              (service) => service.id === selectedService.id
            ) !== -1;
          if (!hasService) barbers.splice(barberIndex, 1);
        }
      }

      setShowCart(selectedFlow !== "barbers");

      //Convert From O(a*b) to O(n) (time complexity)
      const showAsSelectedAlreadySelectedCardStoreItems = () => {

        const getAllCartItemsIdsToHastTable = () => {
          const selectedCartItemsIds = {};

          for (const item of selectedCartItems) {
            selectedCartItemsIds[
              item.barberId.toString() + item.serviceId.toString()
            ] = item.barberId.toString() + item.serviceId.toString();
          }

          return selectedCartItemsIds;
        };

        const selectedCartItemsIds = getAllCartItemsIdsToHastTable();

        if (!helpers.pureObjectIsEmpty(selectedCartItemsIds)) {
          for (const item of barbers) {
            const cartItemId =
              item.id.toString() + selectedService.id.toString();
            if (selectedCartItemsIds[cartItemId]) item.isSelected = true;
          }
        }
      };

      if (selectedFlow !== "barbers")
        showAsSelectedAlreadySelectedCardStoreItems(
          selectedService.id,
          barbers
        );

      setBarbers(barbers);
    };
    onMount();
  }, []);

  const handleOnClick = (item) => {
    const determineGoToNextPageOrAddItemToCart = (item) => {
      dispatch({
        type: "SET_BARBER",
        payload: item,
      });
      if (selectedFlow === "barbers") {
        history.push("/services");
      } else {
        dispatch({
          type: "SET_CART_ITEMS",
          payload: {
            barberFirstName: item.firstName,
            barberLastName: helpers.getFirstLetterOfSurname(item.lastName),
            barberId: item.id,
            serviceName: selectedService.name,
            servicePrice: selectedService.price,
            serviceCurrency: helpers.convertCurrency(selectedService.currency),
            serviceId: selectedService.id,
          },
        });

        const updatedList = helpers.getUpdatedListWithSelectedItem(
          barbers,
          item
        );
        setBarbers(updatedList);
      }
    };
    determineGoToNextPageOrAddItemToCart(item);
  };

  return (
    <PageContainer>
      <div className="barbers--title">Choose a professional</div>
      <div className="flex-container barbers--container">
        <div className="flex-container barber-cards--wrapper">
          {barbers.map((item, index) => {
            return (
              <BarberCard
                key={item.id}
                clickHandler={() => {
                  handleOnClick(item);
                }}
                photo={item.photo}
                firstName={item.firstName}
                lastName={item.lastName}
                isSelected={item.isSelected}
              />
            );
          })}
        </div>
        <div className="cart-container">{showCart ? <Cart /> : null}</div>
      </div>
    </PageContainer>
  );
};

export { Barbers };
