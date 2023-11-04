const axios = require('axios');
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwZXJzZWJhczExQGVtYWlsLmNvbSIsImlhdCI6MTY5OTEzODEyMSwiZXhwIjoxNjk5MTgxMzIxfQ.SW9k6l9Iq-dZ_BZ2QW3fq_0SOX6oMgK-G_GlTkzPAuY'; // Reemplaza con tu token JWT válido

// Configura una instancia de Axios con el token en el encabezado
const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${jwtToken}` // Incluye el token en el encabezado 'Authorization'
  }
});

const getTourists = async () => {
  try {
    const response = await axiosInstance.get('http://localhost:3000/tourists');
    return response.data;
  } catch (error) {
    console.error("Error fetching tourists:", error);
    return null;
  }
};

const getTouristById = async (touristId) => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/tourists/${touristId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el turista con ID ${touristId}: ${error.message}`);
  }
};

module.exports = {
  getTouristById,
  getTourists
};
