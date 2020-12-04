import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ServiceCard } from "../../Components/ServiceCard/ServiceCard";
import { useHistory } from "react-router-dom";
import "./Services.scss";
import { Cart } from "../../Components/Cart/Cart";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { helpers } from "../../common/helpers";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const selectedBarber = useSelector((state) => state.barber);
  const selectedFlow = useSelector((state) => state.flow);
  const selectedCartItems = useSelector((state) => state.cartItems);
  const history = useHistory();

  useEffect(() => {
    const onMount = async () => {
      const services =
        selectedFlow === "barbers" && selectedFlow !== null
          ? selectedBarber.services
          : await (await fetch("/api/services")).json();

      setShowCart(selectedFlow !== "services");

      //Convert From O(a*b) to O(n) (time complexity)
      const showAsSelectedAlreadySelectedCardStoreItems = (
        selectedItemIdOfPreviousPage,
        services
      ) => {
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
          for (const item of services) {
            const cartItemId =
              selectedItemIdOfPreviousPage.toString() + item.id.toString();
            if (selectedCartItemsIds[cartItemId]) item.isSelected = true;
          }
        }
      };

      if (selectedFlow !== "services")
        showAsSelectedAlreadySelectedCardStoreItems(
          selectedBarber.id,
          services
        );

      setServices(services);
    };
    onMount();
  }, []);

  const handleOnClick = (item) => {
    const determineGoToNextPageOrAddItemToCart = (item) => {
      dispatch({ type: "SET_SERVICE", payload: item });
      if (selectedFlow === "services") {
        history.push("/barbers");
      } else {
        dispatch({
          type: "SET_CART_ITEMS",
          payload: {
            barberFirstName: selectedBarber.firstName,
            barberLastName: helpers.getFirstLetterOfSurname(
              selectedBarber.lastName
            ),
            barberId: selectedBarber.id,
            serviceName: item.name,
            servicePrice: item.price,
            serviceCurrency: helpers.convertCurrency(item.currency),
            serviceId: item.id,
          },
        });

        const updatedList = helpers.getUpdatedListWithSelectedItem(
          services,
          item
        );
        setServices(updatedList);
      }
    };
    determineGoToNextPageOrAddItemToCart(item);
  };

  return (
    <PageContainer>
      <div className="services--title">Choose a service</div>
      <div className="flex-container services--container">
        <div className="flex-container service-cards--wrapper">
          {services.map((item, index) => {
            return (
              <ServiceCard
                key={item.id}
                clickHandler={() => {
                  handleOnClick(item);
                }}
                name={item.name}
                price={item.price}
                currency={item.currency}
                duration={item.duration}
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

export { Services };
