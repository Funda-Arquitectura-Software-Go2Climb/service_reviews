const service = require('../services/service');

const createReview = async (req, res) => {
  try {
    const review = await service.createReview(req.body);
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await service.getReviews();
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
      const id = req.params.id; // Asume que estás pasando el ID en la URL como /reviews/:id
      const review = await service.getReviewById(id);
      
      if (!review) {
          return res.status(404).send({ message: "Review not found" });
      }

      res.send(review);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};


module.exports = {
  createReview,
  getReviews,
  getReviewById
};
