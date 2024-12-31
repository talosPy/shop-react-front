import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const API_URL_PRODUCTS = "http://localhost:4000/products";
  const API_URL_CART = "http://localhost:4000/cart";

  // Fetch products and cart data
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(API_URL_PRODUCTS);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchCart() {
    try {
      const response = await fetch(API_URL_CART);
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCart(data);
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
      const response = await fetch(API_URL_PRODUCTS, {
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

  async function handleAddToCart(product) {
    try {
      const response = await fetch(API_URL_CART, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to add product to cart");
      setCart([...cart, product]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemoveFromCart(id) {
    try {
      const response = await fetch(`${API_URL_CART}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove product from cart");
      setCart(cart.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function calculateTotal() {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="http://localhost:3000/">
              Fizzy Bublah
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="http://localhost:3000/">Home</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="jumbotron text-center">
        <h1>Fizzy Bublah</h1>
        <p>Going Out Of Business Sale</p>
      </div>

      <div className="container my-4">
        <SearchBar search={search} setSearch={setSearch} />
        <AddProductForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProduct={handleAddProduct}
        />
        <ProductList products={filteredProducts} handleAddToCart={handleAddToCart} />
        <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} calculateTotal={calculateTotal} />
      </div>

      <footer className="text-center">
        <p>© 2024 Fizzy Bublah. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
