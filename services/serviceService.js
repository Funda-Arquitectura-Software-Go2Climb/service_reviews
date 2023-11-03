const axios = require('axios');

const getServices = async () => {
    try {
        const response = await axios.get('http://localhost:3000/services');
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return null;
    }
}
const getServicesById = async (servicesId) => {
    try {
        const response = await axios.get(`http://localhost:3000/services/${servicesId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener el service con ID ${servicesId}: ${error.message}`);
    }
};

module.exports = {
    getServices,
    getServicesById
};
