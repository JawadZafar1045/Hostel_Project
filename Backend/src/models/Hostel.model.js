const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    type: {
      type: String,
      enum: ['boys', 'girls', 'mixed'],
      required: true
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    price: {
      monthly: { type: Number, required: true },
      currency: { type: String, default: 'PKR' }
    },
    amenities: [String],
    images: [String],
    rooms: {
      total: { type: Number, required: true },
      available: { type: Number, required: true }
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 }
  },
  { 
    timestamps: true 
  }
);

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
