const repository = require('../repositories/repository');
const touristService = require('./touristService');

const createReview = async (review) => {
  const tourists = await touristService.getTourists();
  const tourist = tourists.find(t => t.id === review.tourist_id);
  if (!tourist) {
    throw new Error("Tourist not found");
  }
  return repository.createReview(review);
};

const getReviews = async () => {
  const reviews = await repository.getReviews();

  if (!reviews) {
    return null;
  }

  const reviewsWithTourists = await Promise.all(reviews.map(async review => {
    const tourist = await touristService.getTouristById(review.tourist_id);
    if (tourist) {
      review.dataValues.tourist = tourist;
      delete review.dataValues.tourist_id;
    }
    return review.dataValues;
  }));

  return reviewsWithTourists;
};

const getReviewById = async (id) => {
  const review = await repository.getReviewById(id);

  if (!review) {
    return null;
  }

  const tourist = await touristService.getTouristById(review.tourist_id);
  if (tourist) {
    review.dataValues.tourist = tourist;
    delete review.dataValues.tourist_id;
  }

  return review.dataValues;
};

module.exports = {
  createReview,
  getReviews,
  getReviewById
};
