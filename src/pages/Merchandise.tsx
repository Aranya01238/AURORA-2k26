import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Environment } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Shirt, Package, Zap, Heart, Plus, Minus } from 'lucide-react';

// 3D T-Shirt Component
function TShirt3D({ position, color = "#3b82f6" }: { position: [number, number, number], color?: string }) {
  const shirtRef = useRef<any>();
  
  useFrame((state) => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      shirtRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={shirtRef} position={position}>
        {/* T-shirt body */}
        <mesh>
          <boxGeometry args={[2.5, 3, 0.3]} />
          <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
        </mesh>
        
        {/* T-shirt sleeves */}
        <mesh position={[-1.8, 0.8, 0]}>
          <boxGeometry args={[1, 1.5, 0.3]} />
          <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
        </mesh>
        <mesh position={[1.8, 0.8, 0]}>
          <boxGeometry args={[1, 1.5, 0.3]} />
          <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
        </mesh>
        
        {/* Collar */}
        <mesh position={[0, 1.3, 0.16]}>
          <torusGeometry args={[0.4, 0.1, 8, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        
        {/* AURORA 2K26 Logo */}
        <mesh position={[0, 0.2, 0.16]}>
          <boxGeometry args={[1.5, 0.8, 0.02]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Shopping Bag
function ShoppingBag3D() {
  const bagRef = useRef<any>();
  
  useFrame((state) => {
    if (bagRef.current) {
      bagRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      bagRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.5}>
      <group ref={bagRef} position={[5, 0, -2]}>
        {/* Bag body */}
        <mesh>
          <boxGeometry args={[2, 2.5, 1.5]} />
          <meshStandardMaterial color="#8b4513" metalness={0.2} roughness={0.8} />
        </mesh>
        
        {/* Bag handles */}
        <mesh position={[-0.6, 1.8, 0]}>
          <torusGeometry args={[0.3, 0.1, 8, 16]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.6, 1.8, 0]}>
          <torusGeometry args={[0.3, 0.1, 8, 16]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Magical sparkles around bag */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 4) * 2,
            Math.sin(i * Math.PI / 4) * 2,
            Math.sin(i * Math.PI / 4) * 1
          ]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffd700" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// 3D Package Box
function PackageBox({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group position={position}>
        {/* Box */}
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#d97706" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Ribbon */}
        <mesh position={[0, 0, 0.76]}>
          <boxGeometry args={[1.6, 0.2, 0.02]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, 0, 0.76]}>
          <boxGeometry args={[0.2, 1.6, 0.02]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        
        {/* Bow */}
        <mesh position={[0, 0.4, 0.8]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>
    </Float>
  );
}

const Merchandise = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<any[]>([]);

  const tshirtPositions: [number, number, number][] = [
    [-4, 2, 1], [4, 1, -1], [-2, 3, -2]
  ];

  const tshirtColors = ["#3b82f6", "#ef4444", "#10b981"];

  const products = [
    {
      id: 1,
      name: "AURORA 2K26 Official T-Shirt",
      price: 599,
      originalPrice: 799,
      image: "/placeholder.svg",
      colors: ["Blue", "Red", "Green", "Black", "White"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rating: 4.8,
      reviews: 124,
      description: "Premium quality cotton t-shirt with magical AURORA 2K26 design. Perfect for showing your fest spirit!"
    },
    {
      id: 2,
      name: "AURORA 2K26 Hoodie",
      price: 1299,
      originalPrice: 1599,
      image: "/placeholder.svg",
      colors: ["Black", "Navy", "Gray"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: 4.9,
      reviews: 89,
      description: "Cozy hoodie with embroidered AURORA logo. Stay warm while looking magical!"
    },
    {
      id: 3,
      name: "AURORA 2K26 Cap",
      price: 399,
      originalPrice: 499,
      image: "/placeholder.svg",
      colors: ["Black", "Blue", "White"],
      sizes: ["One Size"],
      rating: 4.7,
      reviews: 156,
      description: "Stylish cap with AURORA 2K26 branding. Perfect accessory for any outfit!"
    },
    {
      id: 4,
      name: "AURORA 2K26 Tote Bag",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg",
      colors: ["Natural", "Black"],
      sizes: ["One Size"],
      rating: 4.6,
      reviews: 78,
      description: "Eco-friendly tote bag with magical design. Carry your essentials in style!"
    },
    {
      id: 5,
      name: "AURORA 2K26 Sticker Pack",
      price: 149,
      originalPrice: 199,
      image: "/placeholder.svg",
      colors: ["Multicolor"],
      sizes: ["One Size"],
      rating: 4.9,
      reviews: 203,
      description: "Pack of 10 magical stickers featuring AURORA 2K26 designs. Perfect for laptops and notebooks!"
    },
    {
      id: 6,
      name: "AURORA 2K26 Water Bottle",
      price: 499,
      originalPrice: 649,
      image: "/placeholder.svg",
      colors: ["Blue", "Black", "Silver"],
      sizes: ["500ml"],
      rating: 4.8,
      reviews: 92,
      description: "Insulated water bottle with AURORA branding. Stay hydrated in magical style!"
    }
  ];

  const addToCart = (product: any) => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
      cartId: Date.now()
    };
    setCart([...cart, cartItem]);
    setQuantity(1);
    setSelectedSize("");
    setSelectedColor("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section with Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            {/* Left Side - Merchandise Information */}
            <div className="text-white space-y-6 z-10 relative pr-8">
              <Badge className="mb-4 bg-orange-600 hover:bg-orange-700 w-fit">
                <Shirt className="w-4 h-4 mr-2" />
                Official Merchandise
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent leading-tight">
                AURORA Store
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
                Get your official AURORA 2K26 merchandise! Premium quality apparel and accessories with magical designs.
              </p>
              
              {/* Store Features */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <Package className="w-5 h-5 text-orange-500" />
                  <span>Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span>Fast delivery within 3-5 business days</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Heart className="w-5 h-5 text-orange-500" />
                  <span>100% authentic AURORA 2K26 products</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Premium quality materials</span>
                </div>
              </div>
              
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </div>

            {/* Right Side - 3D Scene */}
            <div className="h-[600px] lg:h-[700px] relative">
              <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
                <Suspense fallback={null}>
                  <Environment preset="night" />
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
                  <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#fbbf24" />
                  
                  <group scale={0.7}>
                    {tshirtPositions.map((position, i) => (
                      <TShirt3D key={i} position={position} color={tshirtColors[i]} />
                    ))}
                    
                    <ShoppingBag3D />
                    <PackageBox position={[-5, -1, 2]} />
                    <PackageBox position={[3, -2, 1]} />
                  </group>
                  
                  <Sparkles count={100} scale={15} size={3} speed={0.5} color="#f97316" />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Products</h2>
            <p className="text-gray-300 text-lg">Discover our exclusive AURORA 2K26 merchandise collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="bg-black/20 backdrop-blur-sm border-orange-500/30 hover:bg-black/30 transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="h-64 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-t-lg flex items-center justify-center">
                    <Shirt className="w-24 h-24 text-orange-400" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-orange-400">₹{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                    <Badge className="bg-green-600">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {product.sizes.length > 1 && (
                      <div>
                        <label className="block text-white text-sm mb-1">Size</label>
                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                          <SelectTrigger className="bg-orange-500/10 border-orange-500/30 text-white">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {product.sizes.map((size) => (
                              <SelectItem key={size} value={size}>{size}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {product.colors.length > 1 && (
                      <div>
                        <label className="block text-white text-sm mb-1">Color</label>
                        <Select value={selectedColor} onValueChange={setSelectedColor}>
                          <SelectTrigger className="bg-orange-500/10 border-orange-500/30 text-white">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            {product.colors.map((color) => (
                              <SelectItem key={color} value={color}>{color}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-white text-sm mb-1">Quantity</label>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-white px-4">{quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setQuantity(quantity + 1)}
                          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    {product.reviews} reviews • Free shipping on orders above ₹999
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-12 px-4 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-orange-500/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-orange-500" />
                  Shopping Cart ({cart.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <div>
                        <h4 className="text-white font-semibold">{item.name}</h4>
                        <p className="text-gray-400 text-sm">
                          {item.selectedSize && `Size: ${item.selectedSize} • `}
                          {item.selectedColor && `Color: ${item.selectedColor} • `}
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-orange-400 font-bold">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xl font-bold text-white mb-6">
                  <span>Total:</span>
                  <span className="text-orange-400">
                    ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}
                  </span>
                </div>
                
                <div className="flex gap-4">
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCart([])}
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Merchandise;