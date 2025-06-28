
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { ShoppingBag, Star, TrendingUp, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const featuredCategories = [
    { name: "Fresh Produce", icon: "🥬", color: "bg-green-100", slug: "fresh-produce" },
    { name: "Dairy & Eggs", icon: "🥛", color: "bg-blue-100", slug: "dairy-eggs" },
    { name: "Meat & Seafood", icon: "🥩", color: "bg-red-100", slug: "meat-seafood" },
    { name: "Bakery", icon: "🍞", color: "bg-yellow-100", slug: "bakery" },
    { name: "Pantry", icon: "🥫", color: "bg-orange-100", slug: "pantry" },
    { name: "Beverages", icon: "🥤", color: "bg-purple-100", slug: "beverages" },
  ];

  const topDeals = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      rating: 4.8,
      discount: 25
    },
    {
      id: 2,
      name: "Fresh Milk - 1L",
      price: 89,
      originalPrice: 110,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
      rating: 4.6,
      discount: 19
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 45,
      originalPrice: 60,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
      rating: 4.9,
      discount: 25
    },
    {
      id: 4,
      name: "Premium Olive Oil",
      price: 599,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
      rating: 4.7,
      discount: 25
    }
  ];

  const handleAddToCart = (productName: string) => {
    console.log(`Adding ${productName} to cart`);
    toast({
      title: "Added to cart!",
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Hero Section with animations */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
              Fresh Groceries Delivered
            </h1>
            <p className="text-xl mb-8 text-green-100 animate-fade-in-up [animation-delay:0.2s]">
              Get the freshest produce, dairy, meat, and pantry essentials delivered to your door. Quality guaranteed, prices unbeatable.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm animate-fade-in-up [animation-delay:0.4s]">
              <div className="flex items-center gap-2 hover:animate-bounce-in">
                <Truck className="w-5 h-5 text-yellow-400 animate-float" />
                <span>Free Delivery on $50+</span>
              </div>
              <div className="flex items-center gap-2 hover:animate-bounce-in">
                <Star className="w-5 h-5 text-yellow-400 animate-pulse-slow" />
                <span>Fresh Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 hover:animate-bounce-in">
                <ShoppingBag className="w-5 h-5 text-yellow-400 animate-wiggle" />
                <span>Same Day Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section with staggered animations */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredCategories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.slug}`}
              className={`${category.color} rounded-xl p-6 text-center hover:scale-110 transition-all duration-300 cursor-pointer group animate-scale-in shadow-lg hover:shadow-xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce transition-transform">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Deals Section with enhanced animations */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8 animate-fade-in-left">
          <TrendingUp className="w-8 h-8 text-orange-500 animate-bounce-in" />
          <h2 className="text-3xl font-bold text-gray-800">Today's Fresh Deals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDeals.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden animate-slide-in-bottom hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce-in">
                  {product.discount}% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse-slow" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-800">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <button 
                  onClick={() => handleAddToCart(product.name)}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Section with fade animation */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in-right">All Groceries</h2>
        <div className="animate-fade-in">
          <ProductGrid searchQuery={searchQuery} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
