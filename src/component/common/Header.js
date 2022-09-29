import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  const { totalCount } = props;
  return (
    <div className="plate-co-header-navbar">
      <Link to={`/`}>
        <h2>Plate Co App - POC</h2>
      </Link>
      <Link to={`/cart`}>
        <div className="plate-co-header-cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <div className="plate-co-header-cart-count">{totalCount}</div>
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    totalCount: state.cart.totalCount,
  };
};

export default connect(mapStateToProps)(Header);
