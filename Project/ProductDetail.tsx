
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Tag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

// Import the same products data from ProductGrid
const products = [
  {
    id: 1,
    name: "Organic Bananas - 1kg",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 1234,
    category: "fresh-produce",
    brand: "FreshFarm",
    discount: 25,
    description: "Fresh, organic bananas sourced directly from local farms. Rich in potassium and perfect for a healthy snack.",
    features: [
      "100% Organic",
      "Rich in Potassium",
      "Freshly picked",
      "Perfect ripeness",
      "No artificial additives"
    ],
    specifications: {
      "Weight": "1 kg",
      "Origin": "Local Farms",
      "Shelf Life": "3-5 days",
      "Storage": "Room temperature",
      "Certification": "Organic"
    }
  },
  {
    id: 2,
    name: "Fresh Milk - 1L",
    price: 89,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 856,
    category: "dairy-eggs",
    brand: "PureDairy",
    discount: 19,
    description: "Fresh, pure milk from grass-fed cows. Rich in calcium and essential nutrients for strong bones.",
    features: [
      "From grass-fed cows",
      "Rich in Calcium",
      "No hormones",
      "Pasteurized",
      "Fresh daily delivery"
    ],
    specifications: {
      "Volume": "1 Liter",
      "Fat Content": "3.2%",
      "Shelf Life": "5 days",
      "Storage": "Refrigerate at 4°C",
      "Source": "Local Dairy"
    }
  },
  {
    id: 3,
    name: "Whole Grain Bread",
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618133-d0425e2a3241?w=600&h=600&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 2341,
    category: "bakery",
    brand: "FreshBake",
    discount: 25,
    description: "Freshly baked whole grain bread made with premium ingredients. Perfect for sandwiches and toast.",
    features: [
      "100% Whole Grain",
      "Freshly baked daily",
      "No preservatives",
      "High in fiber",
      "Soft texture"
    ],
    specifications: {
      "Weight": "500g",
      "Ingredients": "Whole wheat flour, water, yeast, salt",
      "Shelf Life": "3 days",
      "Storage": "Room temperature",
      "Slices": "20 slices"
    }
  },
  {
    id: 4,
    name: "Premium Olive Oil - 500ml",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 456,
    category: "pantry",
    brand: "GoldenOil",
    discount: 25,
    description: "Premium extra virgin olive oil cold-pressed from the finest olives. Perfect for cooking and salads.",
    features: [
      "Extra Virgin",
      "Cold Pressed",
      "Rich in antioxidants",
      "Perfect for cooking",
      "Premium quality"
    ],
    specifications: {
      "Volume": "500ml",
      "Type": "Extra Virgin",
      "Origin": "Mediterranean",
      "Shelf Life": "2 years",
      "Storage": "Cool, dry place"
    }
  },
  {
    id: 5,
    name: "Fresh Chicken Breast - 1kg",
    price: 499,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&h=600&fit=crop"
    ],
    rating: 4.4,
    reviewCount: 789,
    category: "meat-seafood",
    brand: "FreshMeat",
    discount: 17,
    description: "Fresh, tender chicken breast perfect for grilling, baking, or stir-frying. High in protein and low in fat.",
    features: [
      "High in protein",
      "Low in fat",
      "Fresh daily",
      "Antibiotic-free",
      "Premium quality"
    ],
    specifications: {
      "Weight": "1 kg",
      "Cut": "Boneless breast",
      "Source": "Free-range farms",
      "Shelf Life": "3 days refrigerated",
      "Storage": "Keep refrigerated at 4°C"
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  console.log('Product ID from URL:', id);
  console.log('Available products:', products.map(p => ({ id: p.id, name: p.name })));

  // Find the product by ID - make sure to convert id to number
  const product = products.find(p => p.id === Number(id));
  
  console.log('Found product:', product);

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product with ID {id} doesn't exist.</p>
          <Link to="/" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} x ${product.name} to cart`);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} x ${product.name} - redirecting to checkout`);
    // Add items to cart first
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Then redirect to checkout
    window.location.href = '/checkout';
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li>/</li>
            <li><Link to={`/category/${product.category}`} className="hover:text-green-600">
              {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ')}
            </Link></li>
            <li>/</li>
            <li className="text-gray-800">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.images ? product.images[selectedImage] : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleToggleWishlist}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-green-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Brand and Name */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-800">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-green-600 font-semibold">
                    {product.discount}% off
                  </span>
                </div>
                <p className="text-sm text-green-600">
                  You save ₹{(product.originalPrice - product.price).toLocaleString()}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Delivery & Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Free Delivery</div>
                      <div className="text-xs text-gray-500">Standard: 3-5 business days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">7 Days Return</div>
                      <div className="text-xs text-gray-500">Easy returns & exchanges</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-sm">Quality Guarantee</div>
                      <div className="text-xs text-gray-500">Fresh products guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-medium text-sm">Cash on Delivery</div>
                      <div className="text-xs text-gray-500">Pay when you receive</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 border-b-2 border-green-600 text-green-600 font-medium">
                Description
              </button>
              <button className="py-4 text-gray-500 hover:text-gray-700">
                Specifications
              </button>
              <button className="py-4 text-gray-500 hover:text-gray-700">
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <h4 className="font-semibold mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
