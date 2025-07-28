const express = require('express');
const router = express.Router();
const {
  getAllSalePoint,
  createSalePoint,
  getSalePoint,
  updateSalePoint,
  deleteSalepoint,
} = require('../controllers/salePointController');

router.route('/').get(getAllSalePoint).post(createSalePoint);
router
  .route('/:id')
  .get(getSalePoint)
  .patch(updateSalePoint)
  .delete(deleteSalepoint);

module.exports = router;
