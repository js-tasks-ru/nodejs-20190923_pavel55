const Product = require('../models/Product');
const mapProducts = require('../mappers/product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.query;
  if (!query) return next();

  const products = await Product
      .find({$text: {$search: query}}, {score: {$meta: 'textScore'}})
      .sort({score: {$meta: 'textScore'}})
      .limit(20);
  ctx.body = {products: products.map(mapProducts)};
      if (error) {
        throw error;
      }
    });

    const productList = await productModel.find({
      $text: {
        $search: `\"${query}\"`,
        $language: 'ru',
      },
    });

    ctx.status = 200;
    ctx.body = { products: [...productList] };
  } catch (err) { 
    productModel.db.close();

    ctx.status = 500;
    ctx.body = 'BD error';

    throw err;
  };
};