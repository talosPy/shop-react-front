function AddProductForm({ newProduct, setNewProduct, handleAddProduct }) {
    function handleInputChange(event) {
      const { name, value } = event.target;
      setNewProduct({ ...newProduct, [name]: value });
    }
  
    return (
      <form onSubmit={handleAddProduct} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="form-control mb-4"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="form-control mb-4"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="form-control mb-4"
          />
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    );
  }
  
  export default AddProductForm;
  