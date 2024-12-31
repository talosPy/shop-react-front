// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigateProvider } from './NavigationContext';  // Adjust path as necessary
import SearchBar from "./components/SearchBar";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8000/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAddProduct(event) {
    event.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all fields.");
      return;
    }
    const newItem = { id: Date.now(), ...newProduct };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error("Failed to add product");
      setProducts([...products, newItem]);
      setNewProduct({ name: "", price: "", image: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  function handleAddToCart(product) {
    setCart([...cart, product]);
  }

  function handleRemoveFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function calculateTotal() {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price);
        return isNaN(price) ? total : total + price;
      }, 0)
      .toFixed(2);
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
      <BrowserRouter>
        <NavigateProvider>  
        <Navbar cart={cart} calculateTotal={calculateTotal} />
        <Jumbotron />
        <SearchBar search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/add"
            element={
              <AddProductForm
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                handleAddProduct={handleAddProduct}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProductList
                products={filteredProducts}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                calculateTotal={calculateTotal}
              />
            }
          />
          <Route
            path="/about"
            element={
              <h1 style={{ textAlign: "center" }}>
                This is Tal's Electronic Store
              </h1>
            }
          />
        </Routes>
        <Footer />
        </NavigateProvider>
      </BrowserRouter>
  );
}

export default App;
