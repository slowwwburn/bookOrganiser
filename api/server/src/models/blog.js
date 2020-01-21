module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    date: DataTypes.DATE,
    image: DataTypes.JSONB,
  })

  return Blog;
};