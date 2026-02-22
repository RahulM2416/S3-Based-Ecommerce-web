import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200">

      <div className="flex justify-between mb-10">
        <h1 className="text-4xl font-bold text-purple-700">
          RM E-COMMERCE WEBSITE 
        </h1>

        <button
          onClick={() => navigate("/create-product")}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl"
        >
          + Create Product
        </button>
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">

        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}

      </div>
    </div>
  );
}