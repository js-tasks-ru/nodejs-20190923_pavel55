const Category = require('../models/Category');
const mapCategory = require('../mappers/category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();
  ctx.body = {categories: categories.map(mapCategory)};
    model = formatResponse(model._doc);
    model.subcategories = model.subcategories.map((subcategory) => {
      return formatResponse(subcategory._doc);
    });
    return model;
  });

  ctx.body = { catrgories : categoryList };
}