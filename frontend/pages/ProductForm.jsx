import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setFile(file);
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = form.image;

    if (!file) {
      alert("Select image first");
      return;
    }
    const mime = file.type.split('/')[1];
    try {
    const response = await fetch("http://localhost:3000/api/get-presigned-url" ,{
        method : "POST",
        headers : {
            'content-type':'application/json'
        },
        body : JSON.stringify({
            mime
        }),
    });

    if(!response.ok){
        console.log('error getting signed url');
        return;
    }

    const data = await response.json();

  const { url , finalName} = data;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if(!res.ok){
    console.log('error uploading to s3');
    return;
  }

  const prodRes = await fetch("http://localhost:3000/api/products" , {
    method : 'POST',
    headers : {
      'content-type' : 'application/json'
    },
    body : JSON.stringify({
      name : form.name,
      description : form.description,
      price : form.price,
      filename : finalName,
    })
  });
  if(!prodRes.ok){
    alert("product upload failed");
    return;
  }
  alert("Upload Successful ✅")
  navigate("/");
} catch(err){
    console.log('error :' ,err);
}

    console.log(form);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-300 p-6">

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 space-y-6"
      >
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-purple-700">
          Add Product
        </h1>

        {/* PRODUCT NAME */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="iPhone 15 Pro"
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description..."
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Price ₹
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="99999"
            min="0"
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium text-gray-700 mb-3">
            Upload Image
          </label>

          <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center hover:bg-purple-50 transition">

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mx-auto"
            />

            <p className="text-gray-500 mt-2 text-sm">
              Click to upload product image
            </p>
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 w-full h-64 object-cover rounded-xl shadow-md"
            />
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:scale-105 transition"
        >
          Upload Product
        </button>

      </form>
    </div>
  );
}