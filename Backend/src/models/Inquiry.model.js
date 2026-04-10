const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hostel',
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    studentName: {
      type: String,
      required: true,
      trim: true
    },
    studentPhone: {
      type: String,
      required: true,
      trim: true
    },
    studentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'closed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
