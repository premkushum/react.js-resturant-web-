// src/components/ProductList.js
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productCost, setProductCost] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    calculateTotalCost(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    calculateTotalCost(products);
  }, [products]);

  const handleAddProduct = () => {
    if (productId && productName && productCost) {
      const newProduct = {
        id: productId,
        name: productName,
        cost: parseFloat(productCost),
      };
      setProducts([...products, newProduct]);
      setProductId('');
      setProductName('');
      setProductCost('');
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const calculateTotalCost = (productsArray) => {
    const total = productsArray.reduce((sum, product) => sum + product.cost, 0);
    setTotalCost(total);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <div>
        <label>
          Product ID:
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label>
        <label>
          Product Cost:
          <input type="text" value={productCost} onChange={(e) => setProductCost(e.target.value)} />
        </label>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.cost}
            <button onClick={() => handleDeleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Total Cost: ${totalCost}</h2>
    </div>
  );
};

export default ProductList;
