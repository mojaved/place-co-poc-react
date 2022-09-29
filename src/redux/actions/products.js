export const products = (params) => {
  return (dispatch) =>
    dispatch({
      type: "GET_PRODUCTS",
      payload: params,
    });
};
