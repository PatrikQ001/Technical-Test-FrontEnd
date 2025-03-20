const API_URL = 'http://localhost:3000/api/orders';

export const getOrders = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (order) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Error creating order');
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (id, order) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('Error updating order');
      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
};

export const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting order');
    return await response.json();
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
