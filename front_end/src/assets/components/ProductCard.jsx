import { useUserContext } from "./Context";

const ProductCard = ({ product }) => {
  const { user, setUser, cart, setCart, openModal, setOpenModal } =
    useUserContext();

  return (
    <div className="flex flex-col w-[300px] text-center gap-5  p-4">
      <div className="h-60 w-full overflow-hidden flex justify-center items-center">
        <img
          src={product.img}
          alt={product.name}
          className=" object-contain mb-4"
        />
      </div>
      <div className="w-full flex justify-between">
        <div className="">
          <h2 className="text-gray-800 text-left font-medium">
            {product.name}
          </h2>
          <p className="font-bold text-left text-lg">${product.price}</p>
        </div>
        <button
          className="bg-black text-white px-4 py-2 mt-2 rounded hover:bg-gray-800 cursor-pointer"

          // adding item to cart when the button is clicked 
          onClick={() => {
            if (user.email !== "") {

              // checking if the item already exist in cart 
              if (cart.find((item) => item.id === product.id)) {

                // increasing the quantity if it alreaddy exist 
                return setCart(
                  cart.map((item) =>
                    item.id === product.id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  )
                );
              } else {
                setCart(prev => [...prev, product]);
              }
            } else {
              setOpenModal("signup");
            }
          }}
        >
          BUY
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
