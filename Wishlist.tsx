
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Heart, ShoppingBag } from "lucide-react";

const Wishlist = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock wishlist data - in a real app this would come from state management
  const wishlistItems = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 134900,
      originalPrice: 159900,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      rating: 4.8,
      category: "Electronics",
      brand: "Apple",
      discount: 16
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      price: 29990,
      originalPrice: 34990,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.9,
      category: "Electronics",
      brand: "Sony",
      discount: 14
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 animate-fade-in-left">
          <Heart className="w-8 h-8 text-red-500 animate-bounce-in" />
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
            {wishlistItems.length} items
          </span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <div 
                key={product.id}
                className="animate-scale-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6 animate-bounce-in" />
            <h2 className="text-2xl font-bold text-gray-600 mb-4 animate-fade-in-up">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 animate-fade-in-up [animation-delay:0.2s]">Start adding products you love to your wishlist</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 animate-scale-in hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
