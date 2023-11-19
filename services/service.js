const repository = require('../repositories/repository');
const serviceService = require('./serviceService');
const touristService = require('./touristService');

const createReview = async (review) => {
  try {
    // const tourists = await touristService.getTourists();

    // if (!tourists) {
    //   throw new Error("Tourists array is null or undefined");
    // }

    // const tourist = tourists.find(t => t.id === review.tourist_id);

    // if (!tourist) {
    //   throw new Error("Tourist not found");
    // }

    // const serviceInfo = await serviceService.getServicesById(review.service_id);

    // if (!serviceInfo) {
    //   throw new Error("Service not found");
    // }

    // review.service = serviceInfo;

    // Llama al método createReview del repositorio para guardar la revisión en la base de datos
    const createdReview = await repository.createReview(review);

    return createdReview;
  } catch (error) {
    console.error('Error in createReview:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado en el código que llama a esta función
  }
};

/*const getReviews = async () => {
  const reviews = await repository.getReviews();

  if (!reviews || reviews.length === 0) {
    return [];
  }

  const reviewsWithTouristsAndServices = await Promise.all(reviews.map(async review => {
    // Obtener información del turista, si existe
    let tourist = null;
    try {
      tourist = await touristService.getTouristById(review.tourist_id);
    } catch (error) {
      console.error('Error fetching tourist information:', error);
    }

    // Obtener información completa del servicio
    const serviceInfo = await serviceService.getServicesById(review.service_id);

    if (tourist) {
      review.dataValues.tourist = tourist;
    }

    if (serviceInfo) {
      review.dataValues.service = serviceInfo;
    }

    // Eliminar los campos de ID que no se necesitan en la respuesta
    delete review.dataValues.tourist_id;
    delete review.dataValues.service_id;

    return review.dataValues;
  }));

  return reviewsWithTouristsAndServices;
};
*/

const getReviews = async () => {
  const reviews = await repository.getReviews();

  if (!reviews || reviews.length === 0) {
    return [];
  }

  const reviewsWithTouristsAndServices = await Promise.all(reviews.map(async review => {
    // Obtener información del turista, si existe
    let tourist = null;
    try {
      tourist = await touristService.getTouristById(review.tourist_id);
    } catch (error) {
      console.error('Error fetching tourist information:', error);
    }

    // Obtener información completa del servicio, si existe
    let serviceInfo = null;
    try {
      serviceInfo = await serviceService.getServicesById(review.service_id);
    } catch (error) {
      console.error('Error fetching service information:', error);
    }

    if (tourist) {
      review.dataValues.tourist = tourist;
    }

    if (serviceInfo) {
      review.dataValues.service = serviceInfo;
    }

    // Eliminar los campos de ID solo si se pudo obtener la información del turista y del servicio
    if (tourist && serviceInfo) {
      delete review.dataValues.tourist_id;
      delete review.dataValues.service_id;
    }

    return review.dataValues;
  }));

  return reviewsWithTouristsAndServices;
};

/*const getReviewById = async (id) => {
  const review = await repository.getReviewById(id);

  if (!review) {
    return null;
  }

  // Obtener información completa del turista
  const tourist = await touristService.getTouristById(review.tourist_id);

  // Obtener información completa del servicio
  const serviceInfo = await serviceService.getServicesById(review.service_id);

  if (tourist && serviceInfo) {
    review.dataValues.tourist = tourist;
    review.dataValues.service = serviceInfo;
    delete review.dataValues.tourist_id;
    delete review.dataValues.service_id;
  }

  return review.dataValues;
};
*/

const getReviewById = async (id) => {
  const review = await repository.getReviewById(id);

  if (!review) {
    return null;
  }

  // Obtener información del turista, si existe
  let tourist = null;
  try {
    tourist = await touristService.getTouristById(review.tourist_id);
  } catch (error) {
    console.error('Error fetching tourist information:', error);
  }

  // Obtener información completa del servicio, si existe
  let serviceInfo = null;
  try {
    serviceInfo = await serviceService.getServicesById(review.service_id);
  } catch (error) {
    console.error('Error fetching service information:', error);
  }

  if (tourist) {
    review.dataValues.tourist = tourist;
  }

  if (serviceInfo) {
    review.dataValues.service = serviceInfo;
  }

  // Eliminar los campos de ID solo si se pudo obtener la información del turista y del servicio
  if (tourist && serviceInfo) {
    delete review.dataValues.tourist_id;
    delete review.dataValues.service_id;
  }

  return review.dataValues;
};


module.exports = {
  createReview,
  getReviews,
  getReviewById
};
