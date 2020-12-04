const initState = {
  barber: null,
  service: null,
  flow: null,
  cartItems: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_FLOW":
      return {
        ...state,
        flow: action.payload,
      };
    case "SET_BARBER":
      return {
        ...state,
        barber: action.payload,
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload,
      };
    case "SET_CART_ITEMS":
      const exists =
        state.cartItems.findIndex(
          (el) =>
            el.barberId + el.serviceId ===
            action.payload.barberId + action.payload.serviceId
        ) !== -1;

      if (!exists) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      return state;
    case "CLEAR_FLOW":
      return {
        ...state,
        flow: null,
      };
    case "CLEAR_BARBER":
      return {
        ...state,
        barber: null,
      };
    case "CLEAR_SERVICE":
      return {
        ...state,
        service: null,
      };
    case "CLEAR_CART_ITEMS":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export { rootReducer };
