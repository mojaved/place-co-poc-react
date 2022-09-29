import calculate from "../helpers/special-offer";
const initialState = { cart: [], totalCount: 0, itemsTotal: 0 };
const ShoppingCartReducer = (state = initialState, action) => {
  let { cart } = state;
  switch (action.type) {
    case "UPDATE_TO_CART":
      const { code, operator, cost } = action.payload;
      const search = cart.find((x) => x.code === code);
      switch (operator) {
        case "+":
          if (!search) {
            cart.push({
              code: code,
              quantity: 1,
              price: cost,
              total: cost,
            });
          } else {
            search.quantity += 1;
            search.total = calculate(code, cost, search.quantity);
          }
          break;
        case "-":
          if (search && search.quantity > 0) {
            search.quantity -= 1;
            search.total = calculate(code, cost, search.quantity);
          }
          if (!search || search.quantity === 0) {
            cart = state.cart.filter((x) => x.code !== code);
          }
          break;
        default:
          break;
      }

      state = {
        cart,
        totalCount: cart.reduce((x, y) => x + y.quantity, 0),
        itemsTotal: cart
          .reduce((x, y) => x + y.total, 0)
          .toFixed(3)
          .slice(0, -1),
      };

      return {
        ...state,
      };
    case "REMOVE_CART":
      const { rmvItemCode } = action.payload;
      cart = cart.filter((x) => x.code !== rmvItemCode);
      if (!cart || cart.length === 0) {
        state = { cart: [], totalCount: 0, itemsTotal: 0 };
      } else {
        state = {
          cart,
          totalCount: cart.reduce((x, y) => x + y.quantity, 0),
          itemsTotal: cart
            .reduce((x, y) => x + y.total, 0)
            .toFixed(3)
            .slice(0, -1),
        };
      }
      return {
        ...state,
      };
    case "CLEAR_CART":
      state = { cart: [], totalCount: 0, itemsTotal: 0 };
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ShoppingCartReducer;
