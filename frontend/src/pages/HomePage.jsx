import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat h-screen flex items-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1708077043752-e71f1da52c77?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="grid grid-cols-4 gap-8 w-full max-w-7xl mx-auto p-10">
          <div className="col-span-2 bg-black bg-opacity-50 p-8 rounded-lg text-white">
            <p className="mb-4 leading-relaxed text-lg">
              Introducing OceanFresh Delivery, your go-to source for the finest
              seafood delivered right to your doorstep! We specialize in
              providing a diverse selection of freshly caught fish, succulent
              shrimp, and other ocean delights, all sourced sustainably from
              trusted local fisheries. Our commitment to quality ensures that
              every order is packed with care, preserving the freshness and
              flavor of the sea. Whether you're planning a gourmet dinner or a
              casual family meal, OceanFresh makes it easy to enjoy delicious
              seafood without the hassle. Experience the convenience of fresh,
              flavorful seafood delivered straight to you—just a click away!
            </p>
            <Link to="/store">
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300">
                Explore Store
              </button>
            </Link>
          </div>

          {/* <div className="col-span-2 m-10 rounded-lg overflow-hidden border-2 border-white">
            <img
              className="w-full h-full object-cover opacity-90 rounded-md"
              src="https://plus.unsplash.com/premium_photo-1669261880961-ea68f9a2b7f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Fresh seafood"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
