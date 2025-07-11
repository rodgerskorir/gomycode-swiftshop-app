import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/cart/CartContext";
import { AuthContext } from "../../context/AuthContext";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Footer from "../../components/footer/Footer";
import LoginModal from "../../components/auth/LoginModal";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!user) setShowLoginModal(true);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LoggedInNavbar />

      {showLoginModal && !user && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitch={() => setShowLoginModal(false)}
        />
      )}

      <main className="flex-1 p-6 max-w-4xl mx-auto">
        {!user ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">Please log in to view your cart.</h2>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Start adding some items</p>
            <div className="mt-6">
              <Link to="/products" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={`${item._id}-${item.selectedSize}`} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 border rounded-md overflow-hidden">
                      <img src={item.image[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">Ksh {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                        )}
                      </div>
                      <div className="flex-1 flex items-end justify-between mt-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedSize)}
                            disabled={item.quantity <= 1}
                            className={`px-3 py-1 bg-gray-100 hover:bg-gray-200 ${
                              item.quantity <= 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
                            }`}
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-x w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedSize)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id, item.selectedSize)}
                          className="flex items-center text-sm text-red-600 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Ksh{" "}
                    {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Ksh 0.00</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-medium">
                    Ksh{" "}
                    {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="mt-6 w-full bg-black text-white rounded-md py-3 px-4 text-base font-medium hover:bg-blue-600">
                  Checkout
                </button>
              </Link>

              <div className="mt-6 flex justify-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/products" className="text-blue-600 font-medium hover:text-blue-500">
                    Continue Shopping &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
