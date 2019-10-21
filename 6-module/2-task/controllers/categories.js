const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  
  const categoriesArr = await Category.find();
  ctx.body = {categories : categoriesArr};
};
