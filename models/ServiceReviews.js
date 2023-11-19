'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ServiceReviews extends Model {}

  ServiceReviews.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tourist_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ServiceReviews', 
    tableName: 'service_reviews', 
    timestamps: false
  });

  return ServiceReviews;
};
