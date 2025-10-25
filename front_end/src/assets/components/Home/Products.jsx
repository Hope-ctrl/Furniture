import { useState } from "react";
import furniture1 from "../../images/product_images/furniture1.jpg";
import furniture2 from "../../images/product_images/furniture2.jpg";
import furniture3 from "../../images/product_images/furniture3.jpg";
import light from "../../images/product_images/lighting.jpg";
import light2 from "../../images/product_images/lighting2.jpg";
import decor from "../../images/product_images/decor.jpg";
import decor2 from "../../images/product_images/decor2.jpg";
import { useUserContext } from "../Context";
import ProductCard from "../ProductCard";

const Products = () => {
  const { user, setUser, cart, setCart } = useUserContext();

  const [activeButton, setActiveButton] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const buttons = [
    {
      id: 1,
      tag: "All",
    },
    {
      id: 2,
      tag: "furniture",
    },
    {
      id: 3,
      tag: "decor",
    },
    {
      id: 4,
      tag: "light",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Comfortable Chair",
      price: 400,
      img: furniture1,
      category: "furniture",
      quantity: 1,
    },
    {
      id: 2,
      name: "Comfortable Chair",
      price: 400,
      img: furniture2,
      category: "furniture",
      quantity: 1,
    },
    {
      id: 3,
      name: "Comfortable Chair",
      price: 400,
      img: furniture3,
      category: "furniture",
      quantity: 1,
    },
    {
      id: 4,
      name: "Frame decor",
      price: 400,
      img: decor,
      category: "decor",
      quantity: 1,
    },
    {
      id: 5,
      name: "decor",
      price: 400,
      img: decor2,
      category: "decor",
      quantity: 1,
    },
    {
      id: 6,
      name: "light",
      price: 400,
      img: light,
      category: "light",
      quantity: 1,
    },
    {
      id: 7,
      name: "lamb lighting",
      price: 400,
      img: light2,
      category: "light",
      quantity: 1,
    },
  ];

  // const handleClick = (button, cate)=>{
  //     setActiveButton(button);
  //     setCategory(cate)
  // }
  return (
    <div className="snap-start">
      <div className="flex justify-center items-center gap-5 mt-5 ">
        {buttons.map((button, index) => (
          <button
            className={`w-30 h-10 border-2 rounded-lg capitalize font-bold mb-[50px] cursor-pointer ${
              activeButton === index
                ? "bg-black text-white"
                : "bg-transparent text-black "
            }`}
            key={index}
            onClick={() => {
              setSelectedCategory(button.tag);
              setActiveButton(index);
            }}
          >
            {button.tag}
          </button>
        ))}
        ;
      </div>
      <div>
        {/* {
                console.log(selectedCategory)
               } */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4  gap-6 mx-auto w-[80%] items-center ">
        {selectedCategory == null || selectedCategory == "All"
          ? products.map((item) => <ProductCard key={item.id} product={item} />)
          : products
              .filter((items) => items.category == selectedCategory)
              .map((item) => <ProductCard key={item.id} product={item} />)}
      </div>
    </div>
  );
};

export default Products;
