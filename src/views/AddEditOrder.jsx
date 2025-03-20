import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrders, createOrder, updateOrder } from '../services/orderService';
import Products from '../components/Products';
const AddEditOrder = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [order, setOrder] = useState({
    order_number: '',
    date: '',
    total_products: 0,
    final_price: '',
    status: '',
  });
  const [showProducts, setShowProducts] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        try {
          const orders = await getOrders();
          const selectedOrder = orders.find((o) => o.id.toString() === id);
          if (selectedOrder) setOrder(selectedOrder);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      }
    };
    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateOrder(id, order); 
      } else {
        await createOrder(order); 
      }
      navigate('/my-orders'); 
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Order' : 'Add Order'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Order #:
          <input
            type="text"
            name="order_number"
            value={order.order_number}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={order.date.split('T')[0]} 
            onChange={handleChange}
            required
          />
        </label>
        <label>
          # Products:
          <input
            type="number"
            name="total_products"
            value={order.total_products}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Final Price:
          <input
            type="text"
            name="final_price"
            value={order.final_price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={order.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <button type="submit">{id ? 'Update Order' : 'Create Order'}</button>
      </form>
      <button
        type="button"
        onClick={() => setShowProducts(true)}
        className="btn btn-primary"
      >
        Manage Products
      </button>
      {showProducts && <Products onClose={() => setShowProducts(false)} />}
    </div>
  );
};
export default AddEditOrder;
