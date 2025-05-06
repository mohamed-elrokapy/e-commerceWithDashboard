import React, { useContext, Fragment } from "react";
import appcontext from "../../context/appcontext";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Productstable = () => {
  const { refresh, setrefresh, products, settargetedproduct } =
    useContext(appcontext);
  const navigate = useNavigate();

  const navigattoproductview = (id) => {
    const product = products.find((p) => p.id == id);
    settargetedproduct(product);
    navigate("/admin/productview");
  };

  const navigattoproductedit = (id) => {
    const product = products.find((p) => p.id == id);
    settargetedproduct(product);
    navigate("/admin/productedit");
  };

  const deleteproduct = async (id) => {
    const product = products.find((p) => p.id == id);
    if (product) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await axios.delete(`https://lime-horse-eyebrow.glitch.me/products/${product.id}`);
          setrefresh(!refresh);
          await Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Product deleted successfully.",
            confirmButtonColor: "#3085d6",
          });
        } catch (error) {
          console.error("server error", error);
        }
      }
    }
  };

  return (
    <div className="w-full p-4">
      <div className="relative flex flex-col w-[95%] mx-auto text-gray-300 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg rounded-lg">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-600 bg-gray-700 text-sm text-white">
                Product
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700 text-sm text-white">
                Price
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700 text-sm text-white">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <Fragment key={product.id}>
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-all">
                  <td className="p-4">
                    <p className="text-sm text-white font-medium truncate max-w-xs">
                      {product.productDescription}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-300">{product.price} $</p>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigattoproductview(product.id)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 p-2 text-white">
                        <FaEye /> View
                      </Button>
                      <Button
                        onClick={() => navigattoproductedit(product.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 p-2 text-white">
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        onClick={() => deleteproduct(product.id)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 p-2 text-white">
                        <FaTrash /> Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productstable;
