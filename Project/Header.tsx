import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const categories = [
    { name: "Fresh Produce", slug: "fresh-produce" },
    { name: "Dairy & Eggs", slug: "dairy-eggs" },
    { name: "Meat & Seafood", slug: "meat-seafood" },
    { name: "Bakery", slug: "bakery" },
    { name: "Pantry", slug: "pantry" },
    { name: "Beverages", slug: "beverages" },
    { name: "Frozen Foods", slug: "frozen-foods" },
    { name: "Sports & Fitness", slug: "sports" }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <span>📱 Download App</span>
              <span>🚚 Free Delivery on $50+</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Customer Care</span>
              <span>Track your order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
              ShopSmart
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for groceries, organic foods and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-6">
            <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <User className="w-6 h-6" />
              <span className="hidden md:block">Login</span>
            </Link>
            
            <Link to="/wishlist" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <Heart className="w-6 h-6" />
              <span className="hidden md:block">Wishlist</span>
            </Link>
            
            <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="hidden md:block">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-3 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
