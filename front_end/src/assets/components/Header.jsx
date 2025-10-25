import { div } from "framer-motion/client";
import { FiMenu } from "react-icons/fi";
import { useUserContext } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/furniture_logo.png";

const Header = ({ onclick }) => {
  const { user, cart, openModal, setOpenModal } = useUserContext();

  const cartCount = cart.length;

  return (
    <div className=" w-full h-[70px] flex justify-between items-center px-5 z-50 fixed bg-[#ffffffd2] ">
      <div>
        <img src={logo} alt="" className=" w-20 " />
      </div>
      {user.email !== "" && openModal === null ? (
        <button
          className="flex gap-5 mr-5 relative cursor-pointer"
          onClick={onclick}
        >
          <div>
            <FontAwesomeIcon icon={faCartShopping} className="text-[20px] " />
          </div>
          <div className="w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[12px] absolute left-[15px] bottom-4 ">
            {!cartCount? 0 : cartCount}
          </div>
        </button>
      ) : (
        <div className="flex gap-5">
          <button
            className=" w-20 h-9 rounded-lg bg-black text-white capitalize cursor-pointer hover:bg-[#3e3e3e] "
            onClick={() => setOpenModal("signup")}
          >
            sign up
          </button>
          <button
            className=" w-20 h-9 rounded-lg border-2  capitalize cursor-pointer hover:bg-[#dbdbdb] "
            onClick={() => setOpenModal("login")}
          >
            login
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
