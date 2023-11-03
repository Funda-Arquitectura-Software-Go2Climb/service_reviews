const db = require("../models");
const ServiceReviews = db.ServiceReviews;


const createReview = async (review) => {
  console.log(ServiceReviews);
  return ServiceReviews.create(review);
};

const getReviews = async () => {
    console.log(ServiceReviews);
  return ServiceReviews.findAll();
};

const getReviewById = async (id) => {
  // Simplemente busca y devuelve la revisión por ID
  return ServiceReviews.findByPk(id);
};

module.exports = {
  createReview,
  getReviews,
  getReviewById

};
