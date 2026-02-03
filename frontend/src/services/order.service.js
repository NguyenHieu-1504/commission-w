import api from './api';

const OrderService = {
    // Create new order
    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    // Get my orders
    getMyOrders: async () => {
        const response = await api.get('/orders/my-orders');
        return response.data;
    },

    // Get all orders (Admin)
    getAllOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    // Get order by ID
    getOrderById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Update order status (Admin)
    updateOrderStatus: async (id, status) => {
        const response = await api.put(`/orders/${id}/status`, { status });
        return response.data;
    },

    // Update payment status (Admin)
    updatePaymentStatus: async (id, paymentStatus) => {
        const response = await api.put(`/orders/${id}/payment`, { paymentStatus });
        return response.data;
    },

    // Cancel order
    cancelOrder: async (id) => {
        const response = await api.put(`/orders/${id}/cancel`);
        return response.data;
    }
};

export default OrderService;
