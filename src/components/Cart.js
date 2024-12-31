import React from "react";
import { Link } from "react-router-dom";


function Cart({ cart, handleRemoveFromCart, calculateTotal }) {
  // Group items by name and count their occurrences
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h5>Shopping Cart</h5>
              <button className="btn btn-success">
                <Link to="/">Continue Shopping</Link>
              </button>
            </div>
            {groupedCart.length === 0 ? (
              <div className="panel-body">
                <p>No items in cart.</p>
              </div>
            ) : (
              <div className="panel-body">
                {groupedCart.map((item, index) => (
                  <div key={item.id} className="panel panel-default mb-3">
                    <div className="panel-heading d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-responsive"
                            style={{ maxHeight: "50px", objectFit: "cover", marginRight: "10px" }}
                          />
                        )}
                        <span>
                          {index + 1}. {item.name} {item.count > 1 && `(${item.count})`} - ${item.price}
                        </span>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="panel-footer">
                      <p>Price: ${item.price * item.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <div className="panel-footer">
                <h6>Total: ${calculateTotal()}</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
