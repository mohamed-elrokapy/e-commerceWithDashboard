import React from "react";
import Productcard from "../Productcard";
import appcontext from "../../../context/appcontext";
import { useContext } from "react";

const Homeproducts = () => {
  const { products } = useContext(appcontext);

  return (
    <div className="bg-[url('/img/pexels-thepaintedsquare-606540.jpg')] bg-cover bg-center py-5">
      <div className="text-white text-center py-5 text-[2em] md:text-[3em]">
        Some of Our Products
      </div>

      <div className="flex gap-[1em] items-center justify-center flex-wrap">
        {products.slice(0, 6).map((product) => (
          <Productcard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Homeproducts;
