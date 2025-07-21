import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/cart/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import LoggedInNavbar from "../../components/navbar/LoggedInNavbar";
import Footer from "../../components/footer/Footer";
import SimilarProductCard from "../../components/shop/SimilarProductCard";
import type { Product, CartItem, ProductImage } from "../../types/Product";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [size, setSize] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/swiftshop/products/${id}`);
        console.log("Fetch status:", res.status);
        const data = await res.json();
        console.log("Fetched data:", data);
        if (res.ok && data.success) {
          setProduct(data.data);
          fetchSimilar(data.data);
        } else {
          toast.error(data.message || "Product not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Network error fetching product");
      } finally {
        setLoading(false);
      }
    }
    async function fetchSimilar(base: Product) {
      try {
        const res = await fetch("http://localhost:5000/swiftshop/products");
        const data = await res.json();
        if (res.ok && data.success) {
          setSimilar(
            (data.data as Product[])
              .filter(p =>
                (p.category === base.category || p.brand === base.brand) &&
                p._id !== base._id
              )
              .slice(0, 4)
          );
        }
      } catch (err) {
        console.error("Fetch similar error", err);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!user) {
      toast.info("Log in to save your cart or checkout faster!", {
        toastId: "info-login",
      });
    }
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading product…</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  const price = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAdd = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    const item: CartItem = {
      ...product,
      selectedSize: size,
      quantity: 1,
    };
    addToCart(item);
    toast.success(`${product.name} added to cart`);
    setShowBtn(true);
  };

  const total = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        {user ? <LoggedInNavbar /> : <Navbar />}
        <div className="absolute top-4 right-6">
          <ShoppingCart className="w-6 h-6" />
          {total > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {total}
            </span>
          )}
        </div>
      </div>

      <main className="bg-gray-50 max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          {(product.image as ProductImage[]).map((img, i) => (
            <img key={i} src={img} alt={product.name} className="w-full rounded-lg" />
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-500">{product.brand} • {product.category}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold">Ksh {price.toFixed(0)}</span>
            {product.discount && (
              <span className="line-through text-red-500 text-lg">Ksh {product.price}</span>
            )}
          </div>
          <div>
            <label className="font-medium">Size:</label>
            <div className="flex gap-2 mt-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 border rounded ${
                    size === s ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleAdd} className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
          {showBtn && (
            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 bg-white border border-black py-2 rounded-md hover:bg-gray-100"
            >
              View Cart
            </button>
          )}
        </div>
      </main>

      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similar.map(p => (
            <SimilarProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
 