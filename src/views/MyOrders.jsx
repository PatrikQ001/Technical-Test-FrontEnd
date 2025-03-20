import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import Modal from '../components/Modal';
import { getOrders, deleteOrder } from '../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const openModal = (id) => {
    setOrderToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteOrder(orderToDelete);
      setOrders(orders.filter(order => order.id !== orderToDelete));
      closeModal();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      <button onClick={() => navigate('/add-order')}>Add New Order</button>
      <OrderTable orders={orders} onEdit={(id) => navigate(`/add-order/${id}`)} onDelete={openModal} />
      <Modal 
        isOpen={isModalOpen} 
        message="Are you sure you want to delete this order?" 
        onConfirm={handleDelete} 
        onCancel={closeModal} 
      />
    </div>
  );
};

export default MyOrders;
