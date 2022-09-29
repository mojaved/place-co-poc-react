const calculate = (itemCode, price, items) => {
  let itemsPrice = 0;
  if (itemCode === "R01") {
    let itemsArr = Array.from({ length: items }, (_, i) => i + 1);
    const fullPriceItems = itemsArr.filter((n) => n % 2).length;
    const dscItems = items - fullPriceItems;
    const halfPrice = Number(price) / 2;
    itemsPrice = halfPrice * dscItems + price * fullPriceItems;
  } else {
    itemsPrice = items * Number(price);
  }

  return itemsPrice;
};

export default calculate;
