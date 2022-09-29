import React from "react";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  AddCart,
  SpecialDiscountCost,
  RemoveCart,
  ClearCart,
} from "../redux/actions/shopping-cart";

const Cart = (props) => {
  const { cartItems, plates } = props;
  const { cart, itemsTotal } = cartItems;
  const dispatch = useDispatch();

  const DisplayEmptyCart = () => {
    return (
      <div>
        <h2>Cart is Empty</h2>
        <Link to={`/`}>
          <button className="HomeBtn">Back to Home</button>
        </Link>
      </div>
    );
  };

  const DisplayCartSummary = () => {
    let shipmentCharges = Number(0);
    if (itemsTotal < 50 && itemsTotal > 0) {
      shipmentCharges = 4.95;
    } else if (itemsTotal > 50 && itemsTotal < 90) {
      shipmentCharges = 2.95;
    }

    return (
      <div>
        <h2>Sub Total : {itemsTotal}</h2>
        <h2>Shipment Charges : {shipmentCharges}</h2>
        <h2>
          Total Bill :
          {(Number(itemsTotal) + shipmentCharges).toFixed(3).slice(0, -1)}
        </h2>
        <button
          onClick={() => {
            dispatch(ClearCart());
          }}
          className="removeAll"
        >
          Clear Cart
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="text-center">
        {cart.length > 0 ? <DisplayCartSummary /> : <DisplayEmptyCart />}
      </div>
      <div className="plate-co-shopping-cart">
        {cart.map((item, key) => {
          let { code, quantity, total } = item;
          let search = plates.find((x) => x.code === code) || {};
          let { image, price, name } = search;
          return (
            <div key={key} className="plate-co-cart-item">
              <img width="100" src={image} alt="" />
              <div className="plate-co-shop-card-details">
                <div className="plate-co-title-price-x">
                  <h4 className="plate-co-title-price">
                    <p>${name}</p>
                    <p className="plate-co-cart-item-price">$ {price}</p>
                  </h4>
                  <FontAwesomeIcon
                    icon={faRemove}
                    onClick={() => {
                      dispatch(RemoveCart({ rmvItemCode: code }));
                    }}
                  />
                </div>
                <div className="cart-buttons">
                  <div className="plate-co-shop-card-buttons">
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() => {
                        dispatch(
                          AddCart({
                            code: code,
                            operator: "-",
                            cost: price,
                          })
                        );
                      }}
                    />
                    <div id={code} className="quantity">
                      {quantity}
                    </div>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => {
                        dispatch(
                          AddCart({
                            code: code,
                            operator: "+",
                            cost: price,
                          })
                        );
                      }}
                    />
                  </div>
                </div>
                <h3>${total.toFixed(3).slice(0, -1)}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    plates: state.products,
  };
};

export default connect(mapStateToProps, {
  AddCart,
  SpecialDiscountCost,
  RemoveCart,
  ClearCart,
})(Cart);
