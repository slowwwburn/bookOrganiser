'use strict';
module.exports = (sequelize, DataTypes) => {
  const coupon = sequelize.define('coupon', {
    code: DataTypes.STRING,
    percentage: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE
  }, {});
  coupon.associate = function(models) {
    // associations can be defined here
  };
  return coupon;
};