import api from './api';

const ProductService = {
    getAllProducts: async (category = null, search = null) => {
        let url = '/products';
        const params = new URLSearchParams();

        if (category && category !== 'All') {
            params.append('category', category);
        }
        if (search) {
            params.append('search', search);
        }

        if (params.toString()) {
            url += '?' + params.toString();
        }

        const response = await api.get(url);
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    createProduct: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id) => {
        await api.delete(`/products/${id}`);
    }
};

export default ProductService;
