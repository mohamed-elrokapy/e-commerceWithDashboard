import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayOut from "./users/user/UserLayOut";
import appcontext from "./users/context/appcontext";
import axios from "axios";
import AdminLayOut from "./users/admin/AdminLayOut";

const App = () => {
  const [shoppinglist, setshoppinglist] = useState([]);
  const [products, setproducts] = useState([]);
  const [targeteduser, settargeteduser] = useState({});
  const [targetedproduct, settargetedproduct] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [addtocartcount, setaddtocartcount] = useState("");
  const [isloggedin, setisloggedin] = useState(
    localStorage.getItem("postuserid") ? true : false
  );
  const [logeduserinfo, setlogeduserinfo] = useState([]);
  const [allusers, setallusers] = useState([]);

  const fetchLoggedUser = (id) => {
    if (isloggedin && id) {
      axios
        .get(`https://lime-horse-eyebrow.glitch.me/users/${id}`)
        .then((response) => setlogeduserinfo(response.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  };

  const fetchproducts = () => {
    axios
      .get("https://lime-horse-eyebrow.glitch.me/products")
      .then((res) => setproducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const fetchUsers = () => {
    axios
      .get("https://lime-horse-eyebrow.glitch.me/users")
      .then((res) => setallusers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchproducts();
    fetchUsers();
  }, [refresh]);

  useEffect(() => {
    fetchLoggedUser(localStorage.getItem("postuserid"));
  }, [isloggedin]);

  return (
    <appcontext.Provider
      value={{
        isloggedin,
        setisloggedin,
        logeduserinfo,
        setlogeduserinfo,
        products,
        addtocartcount,
        setaddtocartcount,
        targeteduser,
        settargeteduser,
        shoppinglist,
        setshoppinglist,
        allusers,
        fetchproducts,
        fetchUsers,
        refresh,
        setrefresh,
        targetedproduct,
        settargetedproduct,
      }}>
      <Routes>
        <Route path="/*" element={<UserLayOut />} />
        <Route path="/admin/*" element={<AdminLayOut />} />
      </Routes>
    </appcontext.Provider>
  );
};

export default App;
