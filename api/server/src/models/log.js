'use strict';
module.exports = (sequelize, DataTypes) => {
  const log = sequelize.define('log', {
    status: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  log.associate = function(models) {
    // associations can be defined here
  };
  return log;
};