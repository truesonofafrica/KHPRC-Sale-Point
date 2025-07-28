const mongoose = require('mongoose');
const contact = require('./contactModel');

const SalePointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sale point must have a name'],
  },

  region: {
    type: String,
    required: [true, 'Sale point must have a region'],
  },

  city: {
    type: String,
    required: [true, 'Sale point must have a city'],
  },

  location: {
    type: String,
    required: [true, 'Sale point must have a location'],
  },

  contacts: {
    type: [contact],
    required: [true, 'Sale point must have at least one contact'],
    validate: {
      validator: function (contacts) {
        return contacts.length > 0;
      },
      message: 'Sale point must have at least one phone number',
    },
  },

  doesDelivery: {
    type: Boolean,
    required: true,
    default: false,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

SalePointSchema.index({ name: 1, location: 1 }, { unique: true });

module.exports = mongoose.model('Salepoint', SalePointSchema);
