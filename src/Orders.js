import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "./firebase";
import Order from "./Order";
import { useStateValue } from "./StateProvider";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    function initialise() {
      if (user) {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .orderBy("created", "desc")
          .onSnapshot((snapshot) => {
            setOrders(
              snapshot.docs.map((doc) => {
                console.log(doc.data());
                return {
                  id: doc.id,
                  data: doc.data(),
                };
              })
            );
            console.log("Orders are: ", orders);
          });
      } else {
        setOrders([]);
      }
      console.log(user);
    }

    initialise();
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders?.map((order, id) => {
          return <Order key={id} order={order} />;
        })}
      </div>
    </div>
  );
}

export default Orders;
