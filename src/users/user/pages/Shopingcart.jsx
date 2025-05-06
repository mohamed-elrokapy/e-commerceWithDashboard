import Shopingcartproduct from "../copmpnents/shopingcart/Shopingcartproduct";
import { Shopingcartsummary } from "../copmpnents/shopingcart/Shopingcartsummary";
import appcontext from "../../context/appcontext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Shopingcart = () => {
  const { shoppinglist, setshoppinglist } = useContext(appcontext);
  const [total, settotal] = useState(0);

  function plus(id) {
    const updatedList = shoppinglist.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setshoppinglist(updatedList);
  }

  function minus(id) {
    const updatedList = shoppinglist.map((item) => {
      if (item.id === id && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setshoppinglist(updatedList);
  }

  function productdelete(id) {
    const filteredList = shoppinglist.filter((item) => item.id !== id);
    setshoppinglist(filteredList);
  }

  function alltotal() {
    const totalAmount = shoppinglist.reduce(
      (acc, { count, price }) => acc + count * price,
      0
    );
    settotal(totalAmount.toFixed(2));
  }

  useEffect(() => {
    alltotal();
  }, [shoppinglist]);

  return (
    <div className="pt-20 bg-blue-200 min-h-screen px-4">
      <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
        Shopping Cart
      </h2>

      {shoppinglist && shoppinglist.length > 0 ? (
        <motion.div
          className="flex flex-col justify-center gap-6 bg-gray-300 shadow-lg p-6 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          {shoppinglist.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}>
              <Shopingcartproduct
                item={item}
                plus={plus}
                minus={minus}
                productdelete={productdelete}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Shopingcartsummary total={total} />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center text-gray-600 mt-10"
          initial={{ opacity: 0, x: "150vw" }} // بدأ من اليمين
          animate={{ opacity: 1, x: 0 }} // التحرك إلى المنتصف
          transition={{ duration: 1, type: "spring", stiffness: 50 }}>
          <p className="text-3xl text-white">
            You did not choose your happiness yet. Try to explore{" "}
            <Link to="/products" className="text-blue-500 hover:underline ">
              our products
            </Link>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Shopingcart;
