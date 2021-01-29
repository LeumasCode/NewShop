import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
console.log(productId);
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  console.log(qty);

  const dispatch = useDispatch()

 const cart = useSelector(state => state.cart.cartItems)

 console.log(cart);

  useEffect(()=>{
    if(productId){
        dispatch(addToCart(productId, qty))
    }
  }, [productId, dispatch, qty])

  return <div>Cart</div>;
};

export default CartScreen;
