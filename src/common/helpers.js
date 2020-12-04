const convertCurrency = (currency) => {
  switch (currency) {
    case "usd":
      return "$";
    default:
      return currency;
  }
};

const getFirstLetterOfSurname = (surname) => {
  return surname.charAt(0) + ".";
};

const getUpdatedListWithSelectedItem = (list, item) => {
  item.isSelected = true;
  const newList = list.map((x) => {
    if (x.id === item.id) {
      const updatedItem = {
        ...x,
        isSelected: true,
      };
      return updatedItem;
    }
    return x;
  });

  return newList;
};

const pureObjectIsEmpty = (obj) =>
  obj && obj.constructor === Object && Object.keys(obj).length === 0;

const helpers = {
  convertCurrency,
  getFirstLetterOfSurname,
  getUpdatedListWithSelectedItem,
  pureObjectIsEmpty
};

export { helpers };
