import { useState, useContext, useEffect } from "react";
import PetsOrderContext from "../../../context/petsOrderContext";
import "./styles.css";
import { OrderItem } from "../../Order Item";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useHistory } from "react-router";
export const ShoppingCartPage = () => {
  
  const [order, setOrder] = useState([]);
  const globalState = useContext(PetsOrderContext);

  const history = useHistory();

  //check if current user is logged in
  useEffect(
    () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if(!user){
          history.push("/login");
        }
      });
    }, []
  )

  useEffect(
    () => {
      setOrder(globalState.order);
    }, [globalState]
  )

  return (
    <div className="pets-page">
      <h1 className="pet-title">My Shopping Cart</h1>
      <div className="order">
          {
            order.map((item) => <OrderItem image={item.image} id={item.id} name={item.name} age={item.age}/>)
          }
          {
            order.length === 0 && <p>Nothing in your cart yet...</p>
          }
      </div>
    </div>
  );
};
