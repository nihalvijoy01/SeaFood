import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function StorePage() {
  const [cart, setCartState] = useState([]);
  const [grandTotal, setGrandState] = useState(0);
  const [storeItems, setStoreItems] = useState([]);
  const [quantity, setQuantState] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const itemslistUrl = "http://127.0.0.1:8000/app1/";
    axios.get(itemslistUrl).then((response) => {
      setStoreItems(response.data);
      setQuantState(Array(response.data.length).fill("1")); // Initialize quantity here
    });
  }, []);

  const fetchCart = async () => {
    const cartUrl = "http://127.0.0.1:8000/app1/cart/";
    const response = await axios.get(cartUrl, {
      headers: { Authorization: `Bearer ${token}` }, // Include the token in the header
    });
    console.log(response.data);
    const cartData = response.data.cart; // Adjust according to your actual response structure
    setCartState(cartData);
    calculateGrandTotal(cartData);
  };

  function handleClick(name, price, index) {
    fetchCart();
    console.log("button clicked1");
    console.log(quantity[index]);

    setCartState([
      ...cart,
      {
        name: name,
        amount: (parseFloat(price) * parseInt(quantity[index])).toFixed(2),
        item_count: quantity[index],
      },
    ]);
    setGrandState((prev) => prev + parseFloat(price) * quantity[index]).toFixed(
      2
    );
  }

  const cartItems = cart.map((item, index) => (
    <div key={index} className="bg-slate-100 m-2 rounded-md">
      <ul>
        <li className="m-2">
          {item.name} x {item.item_count}
        </li>
        <li className="m-2">Amount : ${item.amount}</li>
      </ul>
    </div>
  ));

  // Wrap the object in an array since you're only dealing with one item.
  const listItems = storeItems.map((item, index) => (
    <div
      key={index}
      className="bg-indigo-50 m-2 rounded-md shadow-md hover:shadow-lg transition-shadow"
    >
      <h3 className="font-semibold p-2 ">{item.name}</h3>
      <img
        className="w-44 h-44 p-2 rounded-full"
        src={item.photo_url}
        alt={item.name}
      />
      <p className="m-2">Price: ${item.price}</p>
      <label htmlFor="quantity" className="font-extralight m-3">
        Quantity{" "}
      </label>
      <input
        type="number"
        name="quantity"
        id=""
        min="1"
        max="20"
        defaultValue="1"
        className="bg-grey-50 rounded-md m-2 text-red-400 text-center "
        onChange={(e) =>
          setQuantState((prev) => {
            const newQuantity = [...prev];
            newQuantity[index] = e.target.value;
            return newQuantity;
          })
        }
      />
      <button
        className="bg-yellow-200 p-2 rounded-lg font-bold m-2"
        onClick={() => handleClick(item.name, item.price, index)}
      >
        Add to cart
      </button>
    </div>
  ));

  function ListStoreItems() {
    const divs = [];
    for (let i = 0; i <= listItems.length; i++) {
      divs.push(<div key={i}>{listItems[i]}</div>);
    }
    return <>{divs}</>;
  }

  return (
    <div className="flex justify-center ">
      {/* <h1>Store Page</h1> */}
      <div className="grid grid-cols-4 ">
        <div className="grid grid-cols-4 col-span-3 gap-4">
          {ListStoreItems()}
        </div>
        <div className="row-span-2 le">
          <h2 className="text-lg font-bold text-center">Cart</h2>
          <div className="max-h-80 flex flex-col justify-around overflow-y-scroll ">
            {cartItems}
          </div>
          <span className="font-bold m-2 text-center">
            Grand Total : ${String(grandTotal)}
          </span>
          <button className="bg-blue-500 p-2 rounded-lg font-bold m-2 text-white">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
