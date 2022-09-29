export const AddCart = (params) => {
  return (dispatch) =>
    dispatch({
      type: "UPDATE_TO_CART",
      payload: params,
    });
};

export const SpecialDiscountCost = (params) => {
  return (dispatch) =>
    dispatch({
      type: "SPECIAL_DISCOUNT",
      payload: params,
    });
};

export const RemoveCart = (params) => {
  return (dispatch) =>
    dispatch({
      type: "REMOVE_CART",
      payload: params,
    });
};

export const ClearCart = (params) => {
  return (dispatch) =>
    dispatch({
      type: "CLEAR_CART",
      payload: params,
    });
};