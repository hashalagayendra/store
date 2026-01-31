import StarRating from "./StarRating";
import useCartStore from "../store/cartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4">
      {product.discount && (
        <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
          -{product.discount}%
        </span>
      )}
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <StarRating rating={product.rating} />
      <h3 className="text-gray-800 font-medium mt-2 text-sm">{product.name}</h3>
      <div className="mt-2 flex items-center gap-2">
        {product.originalPrice && (
          <span className="text-gray-400 line-through text-sm">
            ${product.originalPrice}
          </span>
        )}
        <span className="text-orange-500 font-bold">${product.price}</span>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full mt-3 py-2 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
