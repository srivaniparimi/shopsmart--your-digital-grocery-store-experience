
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Category = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  // Format category name for display
  const formattedCategoryName = categoryName
    ? categoryName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' & ')
    : "All Products";

  const categoryIcons: { [key: string]: string } = {
    "fresh-produce": "🥬",
    "dairy-eggs": "🥛",
    "meat-seafood": "🥩",
    "bakery": "🍞",
    "pantry": "🥫",
    "beverages": "🥤",
    "frozen-foods": "🧊",
    "health-beauty": "💊",
    "sports": "🏃‍♂️"
  };

  const categoryIcon = categoryName ? categoryIcons[categoryName] || "🛒" : "🛒";

  const categoryDescriptions: { [key: string]: string } = {
    "fresh-produce": "Fresh fruits and vegetables",
    "dairy-eggs": "Fresh dairy products and farm eggs",
    "meat-seafood": "Quality meat and fresh seafood",
    "bakery": "Fresh baked goods daily",
    "pantry": "Essential pantry items",
    "beverages": "Refreshing drinks and beverages",
    "frozen-foods": "Frozen foods for convenience",
    "health-beauty": "Health and beauty products",
    "sports": "Sports nutrition and fitness supplements"
  };

  const categoryDescription = categoryName 
    ? categoryDescriptions[categoryName] || "Quality groceries in this category"
    : "Fresh and quality groceries in this category";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Category Header with animations */}
      <div className="bg-white border-b border-gray-200 overflow-hidden">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 animate-fade-in-left">
            <span className="text-3xl animate-bounce-in">{categoryIcon}</span>
            <div className="animate-fade-in-up [animation-delay:0.2s]">
              <h1 className="text-2xl font-bold text-gray-800">{formattedCategoryName}</h1>
              <p className="text-gray-600 animate-fade-in [animation-delay:0.4s]">{categoryDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section with staggered animation */}
      <div className="container mx-auto px-4 py-8">
        <div className="animate-slide-in-bottom">
          <ProductGrid searchQuery={searchQuery} categoryFilter={categoryName} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Category;
