// ProductList.js
import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

function ProductList({ products, handleAddToCart }) {
  const navigate = useNavigate();  // Use navigate here

  const handleAddToCartAndNavigate = (product) => {
    handleAddToCart(product);
    navigate("/cart");  // Navigate to the cart page after adding the product
  };

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div className="col-sm-4" key={product.id}>
            <div className="panel panel-primary">
              <div className="panel-heading">{product.name}</div>
              <div className="panel-body">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-responsive"
                    style={{ width: "100%", height: "150px", objectFit: "cover" }} // Ensure same size for all images
                  />
                )}
              </div>
              <div className="panel-footer">
                <p>Price: ${product.price}</p>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAddToCartAndNavigate(product)}  // Call handleAddToCartAndNavigate
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
