import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

export default function App({ orderId, userName, userEmail, amount }) {
  const [flutterId, setFlutterId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const getPublicId = async () => {
      const { data: publicId } = await axios.get("/api/config/flutterwave");

      setFlutterId(publicId);
    };

    getPublicId();
  }, []);


  const config = {
    public_key: flutterId,
    tx_ref: Date.now(),
    amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userEmail,
      phonenumber: "",
      name: userName,
    },
    customizations: {
      title: "New Shop",
      description: "Payment for items in cart",
      logo:
        "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button
        style={{
          padding: "0.5em 3em",
          border: "0.16em solid #FFFFFF",
          margin: "0 0.3em 0.3em 0",
          backgroundColor: "#000",
          boxSizing: "border-box",
          textTransform: "uppercase",
          fontWeight: 400,
          color: "#FFFFFF",
          textAlign: "center",
          transition: "all 0.15s",
        }}
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              //dispatch the payment result
              console.log(response);
              dispatch(payOrder(orderId, response));
             
              //dispatch refresh payOrder
              dispatch({ type: ORDER_PAY_RESET });

              closePaymentModal(); // this will close the modal programmatically
               if (response.status === "successful") {
                 window.location.reload();
               }
            },
            onClose: () => {},
          });
        }}
      >
        Payment with Card
      </button>
    </div>
  );
}
