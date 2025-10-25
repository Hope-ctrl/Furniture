import Header from "../Header";
import chair from "../../images/chair_landing.png";
import { easeIn } from "framer-motion";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className=" w-[100vw] h-[91vh] snap-start mt-17 ">
      <div className=" flex justify-center items-center w-full h-[90%] relative ">
        <div className=" flex flex-col ">
          <p
            style={{ fontFamily: "fontOne" }}
            className=" capitalize text-[30px] "
          >
            we only sell the best
          </p>
          <p
            style={{ fontFamily: "fontOne" }}
            className=" uppercase text-[250px] mt-[-60px] "
          >
            furniture
          </p>
        </div>
        <motion.img
          src={chair}
          className=" absolute w-140 z-auto "
          initial={{ y: -300, opacity: 1 }}
          animate={{ y: [-100, 50, 0], opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
        />
      </div>
    </div>
  );
};

export default Landing;
