import { useState, useContext, useEffect } from "react";
import PetsOrderContext from "../../../context/petsOrderContext";
import "./styles.css";
import { OrderItem } from "../../Order Item";

export const ShoppingCartPage = () => {
  
  const [order, setOrder] = useState([]);
  const globalState = useContext(PetsOrderContext);

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
