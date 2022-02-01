import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

function App() {
  const promise = loadStripe(
    "pk_test_51KODVQSCPll1xPNNVNVSjn5TVCsv1JODB90dQFophpSnx8xqqKKEhqo42MAya93fht2CKVHRiMFYOcgANRPXw3L800xcB1h5A3"
  );
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is:", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            path="/orders"
            element={
              <div>
                <Header />
                <Orders />
              </div>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/checkout"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />

          <Route
            path="/payment"
            element={
              <div>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </div>
            }
          />

          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
