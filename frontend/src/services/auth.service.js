import api from './api';

const AuthService = {
    login: async (username, password) => {
        const response = await api.post('/auth/signin', {
            username,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    register: async (username, email, password, phone) => {
        return await api.post('/auth/signup', {
            username,
            email,
            password,
            phone,
            roles: ['user']
        });
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default AuthService;
