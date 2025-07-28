const SalePoint = require('../models/salePointModel');
const AppError = require('../utils/appError');

const getAllSalePoint = async (req, res) => {
  const { name, location, city, region, doesDelivery } = req.query;

  const queryObject = {};

  if (doesDelivery) {
    queryObject.doesDelivery = doesDelivery === 'true' ? true : false;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (region) {
    queryObject.region = { $regex: region, $options: 'i' };
  }

  if (city) {
    queryObject.city = { $regex: city, $options: 'i' };
  }

  // if (region) {
  //   queryObject.region = region;
  // }
  const salePoints = await SalePoint.find(queryObject);

  res.status(200).json({
    status: 'success',
    numofSalePoints: salePoints.length,
    data: salePoints,
  });
};

const createSalePoint = async (req, res) => {
  const newSalePoint = await SalePoint.create(req.body);

  res.status(201).json({ status: 'success', data: newSalePoint });
};

const getSalePoint = async (req, res) => {
  const id = req.params.id;
  const salePoint = await SalePoint.findById(id);

  if (!salePoint) {
    throw new AppError(`No salepoint found for the id ${id}`, 404);
  }

  res.status(200).json({ status: 'success', data: salePoint });
};

const updateSalePoint = async (req, res) => {
  const id = req.params.id;

  const salePoint = await SalePoint.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!salePoint) {
    throw new AppError(`No salepoint found for the id ${id}`, 404);
  }

  res.status(200).json({ status: 'success', data: salePoint });
};

const deleteSalepoint = async (req, res) => {
  const id = req.params.id;

  await SalePoint.findByIdAndDelete(id);

  res.status(200).json({ status: 'success', message: 'Sale point deleted' });
};

module.exports = {
  getAllSalePoint,
  createSalePoint,
  getSalePoint,
  updateSalePoint,
  deleteSalepoint,
};
