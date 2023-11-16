const repository = require('../repositories/repository');
const serviceService = require('./serviceService');
const touristService = require('./touristService');

const createReview = async (review) => {
  const tourists = await touristService.getTourists();
  const tourist = tourists.find(t => t.id === review.tourist_id);
  
  if (!tourist) {
    throw new Error("Tourist not found");
  }

  const serviceInfo = await serviceService.getServicesById(review.service_id);

  if (!serviceInfo) {
    throw new Error("Service not found");
  }

  review.service = serviceInfo;
  return review;
};

const getReviews = async () => {
  const reviews = await repository.getReviews();

  if (!reviews) {
    return null;
  }

  const reviewsWithTouristsAndServices = await Promise.all(reviews.map(async review => {
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
  }));

  return reviewsWithTouristsAndServices;
};

const getReviewById = async (id) => {
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

module.exports = {
  createReview,
  getReviews,
  getReviewById
};
