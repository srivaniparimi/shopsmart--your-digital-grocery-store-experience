
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Minus, Plus, Trash2, ShoppingBag, Tag, Shield, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const totalSavings = originalTotal - subtotal;
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 animate-fade-in-up">
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4 animate-bounce-in" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in [animation-delay:0.2s]">Your cart is empty</h1>
              <p className="text-gray-600 mb-8 animate-fade-in [animation-delay:0.4s]">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link
                to="/"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block animate-scale-in hover:scale-105 active:scale-95"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 animate-fade-in-left">
          <ShoppingBag className="w-8 h-8 text-green-600 animate-bounce-in" />
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <span className="text-gray-500 animate-fade-in [animation-delay:0.2s]">({cartItems.length} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items with staggered animations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slide-in-bottom">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Items in your cart</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="p-6 animate-fade-in-up hover:bg-gray-50 transition-colors duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg animate-scale-in hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-gray-500">{item.brand}</p>
                            <h3 className="font-semibold text-gray-800 mb-1 hover:text-green-600 transition-colors">{item.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-gray-800">
                                ₹{item.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-green-600 font-semibold animate-pulse-slow">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                              </span>
                            </div>
                            <div className="text-sm text-green-600">
                              ✓ In Stock
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-all duration-300 p-1 hover:scale-110 active:scale-95"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors duration-200 hover:scale-110 active:scale-95"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 font-semibold animate-pulse-slow">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors duration-200 hover:scale-110 active:scale-95"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-800 animate-fade-in">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-gray-500">
                                ₹{item.price.toLocaleString()} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits with animations */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6 animate-fade-in-up [animation-delay:0.3s]">
              <h3 className="font-semibold mb-4">Your Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 animate-fade-in-left hover:scale-105 transition-transform duration-300">
                  <Truck className="w-6 h-6 text-green-600 animate-float" />
                  <div>
                    <div className="font-semibold text-sm">Free Delivery</div>
                    <div className="text-xs text-gray-500">On orders above ₹500</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 animate-fade-in hover:scale-105 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-blue-600 animate-pulse-slow" />
                  <div>
                    <div className="font-semibold text-sm">Secure Payment</div>
                    <div className="text-xs text-gray-500">100% secure transactions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 animate-fade-in-right hover:scale-105 transition-transform duration-300">
                  <Tag className="w-6 h-6 text-orange-600 animate-wiggle" />
                  <div>
                    <div className="font-semibold text-sm">Best Prices</div>
                    <div className="text-xs text-gray-500">Guaranteed lowest prices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary with sticky animation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 animate-scale-in">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between animate-fade-in">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between animate-fade-in [animation-delay:0.1s]">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-green-600 animate-fade-in [animation-delay:0.2s]">
                  <span>Total Savings</span>
                  <span className="font-semibold">-₹{totalSavings.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 animate-fade-in [animation-delay:0.3s]">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="animate-pulse-slow">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {subtotal < 500 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6 animate-bounce-in">
                  <p className="text-sm text-orange-800">
                    Add ₹{(500 - subtotal).toLocaleString()} more to get FREE delivery!
                  </p>
                </div>
              )}

              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 mb-3 hover:scale-105 active:scale-95 animate-scale-in"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-all duration-300 text-center block hover:scale-105 active:scale-95"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
