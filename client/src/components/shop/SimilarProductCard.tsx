
import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";

interface Props {
  product: Product;
}

export default function SimilarProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="border rounded-lg p-3 text-sm hover:shadow transition block"
    >
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full h-32 object-cover rounded"
      />
      <p className="mt-2 font-medium">{product.name}</p>
      <p className="text-blue-500 font-bold">Ksh {product.price}</p>
    </Link>
  );
}
