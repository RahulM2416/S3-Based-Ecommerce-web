export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

      <img
        src={`https://d1e0g0hz55o785.cloudfront.net/${product.filename}`}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm">
          {product.description}
        </p>

        <p className="text-purple-700 font-semibold text-lg">
          ₹ {product.price}
        </p>
      </div>

    </div>
  );
}