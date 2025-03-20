import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import Modal from '../components/Modal';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', unit_price: 0 });
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openModal = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      await fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product) => {
    console.log('Editing Product:', product);
    setCurrentProduct({
      id: product.id,
      name: product.name,
      unit_price: product.unit_price,
    });
    setIsEditing(true);
  };

  const handleAddNewProduct = () => {
    setCurrentProduct({ id: null, name: '', unit_price: 0 });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: name === 'unit_price' ? parseFloat(value) : value });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!currentProduct.name.trim() || currentProduct.unit_price <= 0) {
      alert('Please provide valid product details.');
      return;
    }

    try {
      if (currentProduct.id) {
        await updateProduct(currentProduct.id, currentProduct);
      } else {
        await createProduct(currentProduct);
      }

      await fetchProducts();
      setIsEditing(false);
      setCurrentProduct({ id: null, name: '', unit_price: 0 });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <h1>My Products</h1>
      <button onClick={handleAddNewProduct} className="btn btn-primary">
        Add New Product
      </button>
      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this product?"
        onConfirm={handleDelete}
        onCancel={closeModal}
      />
      {isEditing && (
        <div>
          <h2>{currentProduct.id ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSaveProduct}>
            <label>
              Product Name:
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Unit Price:
              <input
                type="number"
                name="unit_price"
                value={currentProduct.unit_price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />
            </label>
            <button type="submit" className="btn btn-success">
              {currentProduct.id ? 'Save Changes' : 'Add Product'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
