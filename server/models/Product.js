const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title should be at least 3 characters long'],
    maxlength: [50, "Title can't be more than 50 characters long"],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
    minlength: [10, 'Description should be at least 10 characters long'],
    maxlength: [1000, 'Description should be max 1000 characters long'],
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  make: {
    type: String,
    required: [true, 'Make is required'],
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
  },
  image: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
