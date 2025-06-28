
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, CreditCard, Truck, Shield, MapPin, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(0);

  // Mock cart data - in real app this would come from state management
  const cartItems = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 134900,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      price: 29990,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    }
  ];

  const addresses = [
    {
      id: 0,
      name: "John Doe",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      type: "Home"
    },
    {
      id: 1,
      name: "John Doe",
      phone: "+91 9876543210",
      address: "456 Business Park, Office 12, Pune, Maharashtra 411001",
      type: "Office"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    toast({
      title: "Order placed successfully!",
      description: "Your order has been confirmed and will be delivered soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to Cart with animation */}
        <Link to="/cart" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 animate-fade-in-left hover:scale-105 transition-all duration-300">
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in-up">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form with staggered animations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-bottom">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 animate-fade-in">
                <MapPin className="w-5 h-5 text-blue-600 animate-bounce-in" />
                Delivery Address
              </h2>
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 animate-fade-in-up hover:scale-105 ${
                      selectedAddress === address.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{address.name}</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs animate-pulse-slow">
                            {address.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{address.address}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          {address.phone}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        selectedAddress === address.id
                          ? 'border-blue-500 bg-blue-500 scale-110'
                          : 'border-gray-300'
                      }`}>
                        {selectedAddress === address.id && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5 animate-scale-in"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-105 animate-fade-in">
                  + Add New Address
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-bottom [animation-delay:0.2s]">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 animate-fade-in">
                <CreditCard className="w-5 h-5 text-blue-600 animate-bounce-in" />
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                  { id: 'upi', name: 'UPI', icon: '📱' },
                  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
                  { id: 'cod', name: 'Cash on Delivery', icon: '💸' }
                ].map((method, index) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 animate-fade-in-up hover:scale-105 ${
                      selectedPayment === method.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl animate-bounce-in">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        selectedPayment === method.id
                          ? 'border-blue-500 bg-blue-500 scale-110'
                          : 'border-gray-300'
                      }`}>
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5 animate-scale-in"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary with sticky animation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 animate-scale-in">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg animate-scale-in hover:scale-110 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-semibold animate-pulse-slow">₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-4 border-t">
                <div className="flex justify-between animate-fade-in">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between animate-fade-in [animation-delay:0.1s]">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 animate-fade-in [animation-delay:0.2s]">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="animate-pulse-slow">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 animate-bounce-in">
                <div className="flex items-center gap-2 text-green-700">
                  <Shield className="w-4 h-4 animate-pulse-slow" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 animate-scale-in"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
