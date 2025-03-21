const API_ORDER_PRODUCTS_URL = 'https://technical-test-backend-p5el.onrender.com/api/order-products';

export const addProductToOrder = async (orderId, productId, quantity) => {
  try {
    const response = await fetch(API_ORDER_PRODUCTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order_id: orderId, product_id: productId, quantity }),
    });
    if (!response.ok) throw new Error('Error adding product to order');
    return await response.json();
  } catch (error) {
    console.error('Error adding product to order:', error);
    throw error;
  }
};

export const updateProductInOrder = async (orderId, productId, quantity) => {
  try {
    const response = await fetch(`${API_ORDER_PRODUCTS_URL}/${orderId}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw new Error('Error updating product in order');
    return await response.json();
  } catch (error) {
    console.error('Error updating product in order:', error);
    throw error;
  }
};

export const removeProductFromOrder = async (orderId, productId) => {
  try {
    const response = await fetch(`${API_ORDER_PRODUCTS_URL}/${orderId}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error removing product from order');
    return await response.json();
  } catch (error) {
    console.error('Error removing product from order:', error);
    throw error;
  }
};