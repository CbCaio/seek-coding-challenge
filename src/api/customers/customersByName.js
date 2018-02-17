const { Router } = require('express');
const GetCustomersByNameResponseBuilder = require('./builders/GetCustomersByNameResponseBuilder');
const validateSchema = require('is-express-schema-valid').default;
const getCustomersByNameValidationSchema = require('./validations/getCustomersByNameValidationSchema');

const router = new Router();

router.route('/customers/:name')
  .get(
    validateSchema(getCustomersByNameValidationSchema),
    async function getCustomersByNameRoute(req, res, next) {
    try {
      const { name } = req.params;
      const response = await GetCustomersByNameResponseBuilder.build({
        customerName: name,
      });
      res.status(response.statusCode).json(response.body);

      return next();
    } catch (e) {
      return next(e);
    }
  });

module.exports = router;
