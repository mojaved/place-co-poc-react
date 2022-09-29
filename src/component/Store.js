import React from "react";
import { connect, useDispatch } from "react-redux";
import { AddCart } from "../redux/actions/shopping-cart";

const ProductStore = (props) => {
  const { plates } = props;
  const dispatch = useDispatch();
  return (
    <>
      <div className="plate-co-shop-card">
        {plates.map((item, key) => {
          const { code, name, image, price } = item;
          return (
            <div key={key} className="plate-co-shop-card-item">
              <img width="220" src={image} alt=""></img>
              <div className="plate-co-shop-card-details">
                <h4>{name}</h4>
                <h4>$ {price} </h4>
                <button
                  onClick={() => {
                    dispatch(
                      AddCart({ code: code, operator: "+", cost: price })
                    );
                  }}
                  className="HomeBtn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// export default Store;
const mapStateToProps = (state) => {
  return {
    plates: state.products,
  };
};

export default connect(mapStateToProps, { AddCart })(ProductStore);
