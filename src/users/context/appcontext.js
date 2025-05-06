import { createContext } from "react";
const islogedincontext = createContext({
  isLoggedIn: "",
  setIsLoggedIn: () => {},
  logeduserinfo: {},
  setlogeduserinfo: () => {},
  products: [],
  addtocartcount: "",
  setaddtocartcount: () => {},
  shoppinglist: [],
  setshoppinglist: () => {},
  allusers: [],
  targeteduser: {},
  settargeteduser: () => {},
  productsrequest: () => {},
  usersrequest: () => {},
  refresh: false,
  setrefresh: () => () => {},
  targetedproduct: null,
  settargetedproduct: () => {},
});
export default islogedincontext;
