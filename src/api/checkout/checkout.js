const { Router } = require('express');
const PostCheckoutResponseBuilder = require('./builders/PostCheckoutResponseBuilder');
const validateSchema = require('is-express-schema-valid').default;
const postCheckoutValidationSchema = require('./validations/postCheckoutValidationSchema.json');

const router = new Router();

router.route('/checkout')
  .post(
    validateSchema(postCheckoutValidationSchema),
    async function postCheckoutRoute(req, res, next) {
    try {
      const response = await PostCheckoutResponseBuilder.build(req.body);
      res.status(response.statusCode).json(response.body);

      return next();
    } catch (e) {
      return next(e);
    }
  });

module.exports = router;
