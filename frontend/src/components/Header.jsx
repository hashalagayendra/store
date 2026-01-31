import { useState } from "react";
import useCartStore from "../store/cartStore";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const checkout = useCartStore((state) => state.checkout);
  const checkoutSuccess = useCartStore((state) => state.checkoutSuccess);
  const resetCheckoutSuccess = useCartStore(
    (state) => state.resetCheckoutSuccess,
  );

  const handleCheckout = () => {
    checkout();
    setTimeout(() => {
      resetCheckoutSuccess();
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Tech<span className="text-orange-500">Store</span>
        </h1>
        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative text-gray-600 hover:text-orange-500"
        >
          <span className="text-2xl">🛒</span>
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {getTotalItems()}
          </span>
        </button>
      </div>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-800">Shopping Cart</h3>
          </div>

          {checkoutSuccess ? (
            <div className="p-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">✓</span>
              </div>
              <p className="text-gray-800 font-medium text-center">
                Order placed!
              </p>
              <p className="text-gray-400 text-sm text-center mt-1">
                Check your email for details
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 border-b flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-orange-500 font-bold text-sm">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 text-xs hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex justify-between mb-3">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-orange-500">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
