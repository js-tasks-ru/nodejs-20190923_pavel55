const Product = require('../models/Product');
const mongoose = require('mongoose');
const mapProduct = require('../mappers/product');


module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) return next();

  const products = await Product.find({subcategory: subcategory}).limit(20);
  ctx.body = {products: products.map(mapProduct)};
      }],
    });

    let product = await Product.create({
      title: 'Product2',
      description: 'Description2',
      price: 10,
      category: category.id,
      subcategory: category.subcategories[0].id,
      images: ['image1'],
    });

    //Пытаемся передать данные в следующий стрим
    const productsArr = await Product.find();
    ctx.productsList = productsArr;
    await next(); 
  } catch(err) {
    throw err;
  }
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find().limit(20);
  ctx.body = {products: products.map(mapProduct)};
  ctx.body = {products: productsList.map((product) => formatResponse(product._doc))};
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(400, 'invalid product id');
  }

  const product = await Product.findById(ctx.params.id);

  if (!product) {
    ctx.throw(404, `no product with ${ctx.params.id} id`);
  }

  ctx.body = {product: mapProduct(product)};
  
  const {id} = ctx.params;
  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    ctx.status = 400;
    ctx.body = 'Bad id';
    return;
  }

  let productElem = await Product.findById(id);

  if (!productElem) {
    ctx.status = 404;
    ctx.body = 'Product not found!';
    return;
  }
  
  productElem = formatResponse(productElem._doc);
  ctx.body = { product : formatResponse(productElem) };

  await next();
};