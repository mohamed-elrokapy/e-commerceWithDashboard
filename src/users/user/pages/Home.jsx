
import React from "react";
import { GalleryWithCarousel } from "../copmpnents/home/GalleryWithCarousel";
import Homeproducts from "../copmpnents/home/Homeproducts";

const Home = () => {
  return (
    <div className="bg-red-300 min-h-screen transition-all duration-500 ease-in-out">
      <GalleryWithCarousel />
      <Homeproducts />
    </div>
  );
};

export default Home;
