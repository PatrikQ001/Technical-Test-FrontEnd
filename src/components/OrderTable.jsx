import React from 'react';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Order #</th>
          <th>Date</th>
          <th># Products</th>
          <th>Final Price</th>
          <th>Status</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.order_number}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>{order.total_products}</td>
            <td>${order.final_price}</td>
            <td>{order.status}</td>
            <td>
              <button onClick={() => onEdit(order.id)}>Edit Order</button>
              <button onClick={() => onDelete(order.id)}>Delete Order</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OrderTable;



