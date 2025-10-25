import Landing from "../components/Home/Landing";
import Products from "../components/Home/Products";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import { useUserContext } from "../components/Context";
import LoginForm from "../components/Login";
import SignUpForm from "../components/SignUp";
import { FaMinus, FaPlus, FaRecycle, FaTrash } from "react-icons/fa6";
import furniture from "../images/product_images/furniture3.jpg";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect } from "react";
import { Api } from "../components/Api";

const Home = () => {
  const dataBase = {
    username: "samson33",
    password: "password",
  };
  const { user, setUser, cart, setCart, openModal, setOpenModal } =
    useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const deliveryFee = 0;

  // looping through the cart and adding all the prices together with the deliveryfee
  const total = cart.reduce((sum, item) => sum + item.price, 0) + deliveryFee;

  
  useEffect(() => {
    const checkToken = async () => {
      const stored = localStorage.getItem("Token");
      if(!stored){return console.log('token not found')}

      const now = new Date();
      const token = JSON.parse(stored)

      if ( now.getTime() > token.lifeLine){
        console.log(token.lifeLine);
        localStorage.removeItem('Token');
      }
      if (token.value) {
        const res = await Api(null, "verifyToken", token.value);
        if (res.success) {
          setUser((prev) => ({ ...prev, ...res.user }));
        }
      }
    };

    checkToken();
  }, []);

  return (
    <div className="snap-mandatory snap-y overflow-scroll">
      <div
        className={`${
          isOpen ? "w-[350px] p-5" : "w-0"
        } h-[100vh] shadow-lg overflow-hidden transition-all duration-200 ease-in-out fixed z-100 bg-white `}
      >
        <div className="mb-4 flex justify-between">
          <button className=" cursor-pointer " onClick={() => setIsOpen(false)}>
            <FaArrowAltCircleLeft />
          </button>
          <button className=" cursor-pointer " onClick={() => setCart([])}>
            <FaTrash />
          </button>
        </div>
        <p className=" text-2xl capitalize mb-4 ">my order</p>
        {
          // using this to check if anything was found in the cart and displaying it
          cart ? (
            cart.map((item) => (
              <div className="flex mb-4 justify-between  gap-4">
                <div className="flex gap-4 ">
                  <div className="rounded-2xl w-[70px] h-[70px] overflow-hidden ">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className=" font-bold capitalize mb-[-4px] ">
                      {item.name}
                    </p>
                    <p className=" capitalize text-gray-600 text-[14px] mb-[-4px] ">
                      {item.category}
                    </p>
                    <p className=" font-bold text-[20px] ">${item.price}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <button
                    className=" cursor-pointer "
                    onClick={() => {
                      setCart((prevcarts) =>
                        prevcarts.map((cartItem) =>
                          cartItem.id === item.id
                            ? {
                                ...cartItem,
                                quantity: Math.max(1, cartItem.quantity - 1),
                              }
                            : cartItem
                        )
                      );
                    }}
                  >
                    {" "}
                    <FaMinus size={13} />
                  </button>
                  <p className=" font-bold  ">{item.quantity}</p>
                  <button
                    className=" cursor-pointer "
                    onClick={() =>
                      setCart((prevcarts) =>
                        prevcarts.map((cartItem) =>
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                        )
                      )
                    }
                  >
                    <FaPlus size={13} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            // if nothing was found then this runs
            <div>No Orders</div>
          )
        }

        <div className="flex justify-between items-center mt-10 ">
          <p>delivery services:</p>
          <p className=" font-bold ">{deliveryFee}.00</p>
        </div>
        <div className="flex justify-between items-center mt-10 ">
          <div>
            <p>Total Fee:</p>
            <p className=" font-bold text-2xl ">{total}.00</p>
          </div>
          <button className=" p-4 rounded-2xl bg-black text-white cursor-pointer hover:opacity-[0.7] ">
            <FontAwesomeIcon icon={faCartShopping} className="text-[20px] " />{" "}
            Checkout
          </button>
        </div>
      </div>
      <Header onclick={() => setIsOpen(true)} />
      <Landing />
      <Products />

      {/* using motion div together with animate presence to animate the appearance of the login and signup modal */}
      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(null)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                {openModal === "login" ? <LoginForm /> : <SignUpForm />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
