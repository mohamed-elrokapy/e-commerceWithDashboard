import React from "react";
import appcontext from "../../context/appcontext";
import { useContext } from "react";
import Productcard from "../copmpnents/Productcard";

const Products = () => {
  const { products } = useContext(appcontext);
  return (
    <div className=" bg-gray-700 pt-[4em] pb-4 ">
      <div className=" text-green-400  text-center text-[2em] py-4">
        all products{" "}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {products?.map((product) => {
          return <Productcard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
