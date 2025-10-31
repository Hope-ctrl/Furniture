import { createContext, useContext, useState } from "react";

// creating a user context
const UserContext = createContext();

// creating and exporting the context provider 
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
  });
  const [cart, setCart] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const [sideBar, setSidebar] = useState(false)

  return (
    // setting the values of the context that will be used accross pages 
    <UserContext.Provider
      value={{ user, setUser, cart, setCart, openModal, setOpenModal, sideBar, setSidebar }}
    >
      {children}
    </UserContext.Provider>
  );
};

// calling the context in this function and appending it into useContext to make it easier to call 
export const useUserContext = () => {
  return useContext(UserContext);
};
