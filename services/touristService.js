const axios = require('axios');

const getTourists = async () => {
    try {
        const response = await axios.get('http://host.docker.internal:3002/tourists');
        return response.data;
    } catch (error) {
        console.error("Error fetching tourists:", error);
        return null;
    };
}
const getTouristById = async (touristId) => {
        try {
            const response = await axios.get(`http://host.docker.internal:3002/tourists/${touristId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error al obtener el turista con ID ${touristId}: ${error.message}`);
        }
};

module.exports = {
    getTouristById,
    getTourists
};
