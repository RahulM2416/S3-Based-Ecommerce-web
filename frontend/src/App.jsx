import ProductForm from "../pages/ProductForm";
import Home from "../pages/home";
import {BrowserRouter, Routes, Route} from "react-router"

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create-product" element={<ProductForm/>} />
    </Routes>
    </BrowserRouter>
  );
}