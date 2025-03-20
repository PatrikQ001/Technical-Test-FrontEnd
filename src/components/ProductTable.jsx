import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Unit Price</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>${product.unit_price}</td>
            <td>
              <button onClick={() => onEdit(product.id)}>Edit Product</button>
              <button onClick={() => onDelete(product.id)}>Delete Product</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
