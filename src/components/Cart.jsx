import { useSelector, useDispatch } from "react-redux";
import { removeItems, clearCart } from "../utils/CartSlice";
import { CDN_URL } from "../utils/Cdn";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItems(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.card.info.price || item.card.info.defaultPrice || 0);
  }, 0);

  return (
    <div className="text-center m-5 p-5">
      <h1 className="text-2xl font-bold underline mb-5">Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className="text-lg font-semibold">Your cart is empty 🛒</h2>
      ) : (
        <>
          <ul className="space-y-6 w-6/12 mx-auto text-left">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex gap-4 items-start border-b border-gray-300 pb-4"
              >
                {/* Image */}
                <img
                  src={CDN_URL + item.card.info.imageId}
                  alt={item.card.info.name}
                  className="w-28 h-24 object-cover rounded-xl"
                />

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-bold text-xl">{item.card.info.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.card.info.description}
                  </p>
                  <p className="mt-2 font-semibold text-lg">
                    ₹
                    {(item.card.info.price || item.card.info.defaultPrice) /
                      100}
                  </p>

                  <button
                    className="mt-2 text-red-600 underline font-semibold hover:text-red-800"
                    onClick={() => handleRemove(item.card.info.id)}
                  >
                    Remove ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total and Clear */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice / 100}</h2>
            <button
              onClick={handleClear}
              className="mt-4 bg-black text-white p-3 rounded-xl font-bold hover:bg-red-500 transition-all cursor-pointer"
            >
              Clear Cart 🛒
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
