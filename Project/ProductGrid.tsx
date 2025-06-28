import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  category: string;
  brand: string;
  discount: number;
}

interface ProductGridProps {
  searchQuery: string;
  categoryFilter?: string;
}

const ProductGrid = ({ searchQuery, categoryFilter }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState("relevance");
  
  const products: Product[] = [
    {
      id: 1,
      name: "Organic Bananas - 1kg",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
      rating: 4.8,
      category: "fresh-produce",
      brand: "FreshFarm",
      discount: 25
    },
    {
      id: 2,
      name: "Fresh Milk - 1L",
      price: 89,
      originalPrice: 110,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
      rating: 4.6,
      category: "dairy-eggs",
      brand: "PureDairy",
      discount: 19
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 45,
      originalPrice: 60,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
      rating: 4.9,
      category: "bakery",
      brand: "FreshBake",
      discount: 25
    },
    {
      id: 4,
      name: "Premium Olive Oil - 500ml",
      price: 599,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
      rating: 4.7,
      category: "pantry",
      brand: "GoldenOil",
      discount: 25
    },
    {
      id: 5,
      name: "Fresh Chicken Breast - 1kg",
      price: 499,
      originalPrice: 599,
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
      rating: 4.4,
      category: "meat-seafood",
      brand: "FreshMeat",
      discount: 17
    },
    {
      id: 6,
      name: "Organic Eggs - 12 pcs",
      price: 120,
      originalPrice: 150,
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
      rating: 4.5,
      category: "dairy-eggs",
      brand: "FarmFresh",
      discount: 20
    },
    {
      id: 7,
      name: "Orange Juice - 1L",
      price: 149,
      originalPrice: 179,
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
      rating: 4.8,
      category: "beverages",
      brand: "FreshJuice",
      discount: 17
    },
    {
      id: 8,
      name: "Fresh Apples - 1kg",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
      rating: 4.3,
      category: "fresh-produce",
      brand: "OrchardFresh",
      discount: 20
    },
    {
      id: 9,
      name: "Greek Yogurt - 500g",
      price: 159,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1571212515416-fef01b80b810?w=400&h=400&fit=crop",
      rating: 4.6,
      category: "dairy-eggs",
      brand: "CreamyDelight",
      discount: 20
    },
    {
      id: 10,
      name: "Frozen Mixed Vegetables - 1kg",
      price: 249,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=400&fit=crop",
      rating: 4.7,
      category: "frozen-foods",
      brand: "FrozenFresh",
      discount: 17
    },
    {
      id: 11,
      name: "Organic Honey - 500g",
      price: 399,
      originalPrice: 499,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      rating: 4.4,
      category: "pantry",
      brand: "PureHoney",
      discount: 20
    },
    {
      id: 12,
      name: "Croissants - 6 pcs",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1555507036-ab794f4eed25?w=400&h=400&fit=crop",
      rating: 4.9,
      category: "bakery",
      brand: "FreshBake",
      discount: 20
    },
    // Sports/Fitness Products
    {
      id: 13,
      name: "Sports Energy Drink - 500ml",
      price: 89,
      originalPrice: 109,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop",
      rating: 4.5,
      category: "sports",
      brand: "EnergyMax",
      discount: 18
    },
    {
      id: 14,
      name: "Protein Bar - Chocolate",
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=400&fit=crop",
      rating: 4.7,
      category: "sports",
      brand: "FitPro",
      discount: 25
    },
    {
      id: 15,
      name: "Whey Protein Powder - 1kg",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop",
      rating: 4.8,
      category: "sports",
      brand: "MuscleFuel",
      discount: 17
    },
    {
      id: 16,
      name: "Coconut Water - 330ml",
      price: 79,
      originalPrice: 99,
      image: "https://images.unsplash.com/photo-1556909114-c71d5c1b1825?w=400&h=400&fit=crop",
      rating: 4.6,
      category: "sports",
      brand: "PureCoconut",
      discount: 20
    },
    {
      id: 17,
      name: "Mixed Nuts - 200g",
      price: 399,
      originalPrice: 499,
      image: "https://images.unsplash.com/photo-1518810765707-7f5d5c8eaecf?w=400&h=400&fit=crop",
      rating: 4.5,
      category: "sports",
      brand: "NutMix",
      discount: 20
    },
    {
      id: 18,
      name: "Electrolyte Drink Mix",
      price: 299,
      originalPrice: 349,
      image: "https://images.unsplash.com/photo-1594736797933-d0851ba0bfe4?w=400&h=400&fit=crop",
      rating: 4.4,
      category: "sports",
      brand: "HydroMax",
      discount: 14
    },
    {
      id: 19,
      name: "Energy Granola Bar - 6 Pack",
      price: 249,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop",
      rating: 4.6,
      category: "sports",
      brand: "EnergyBite",
      discount: 17
    },
    {
      id: 20,
      name: "Pre-Workout Powder - 300g",
      price: 1799,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      rating: 4.7,
      category: "sports",
      brand: "PowerFuel",
      discount: 18
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category if provided
    if (categoryFilter) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "discount":
        return [...filtered].sort((a, b) => b.discount - a.discount);
      default:
        return filtered;
    }
  }, [searchQuery, categoryFilter, sortBy]);

  return (
    <div>
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="text-gray-600">
          Showing {filteredProducts.length} products
          {searchQuery && (
            <span className="ml-2 text-green-600 font-semibold">
              for "{searchQuery}"
            </span>
          )}
          {categoryFilter && (
            <span className="ml-2 text-green-600 font-semibold">
              in {categoryFilter.replace('-', ' & ')}
            </span>
          )}
        </div>
        
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or browse our categories</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
