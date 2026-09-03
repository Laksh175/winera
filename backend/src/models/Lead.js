import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  countryCode: {
    type: String,
    default: '+91',
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  fullPhone: {
    type: String,
    trim: true
  },
  pageSource: {
    type: String,
    default: 'General Website',
    trim: true
  },
  pageUrl: {
    type: String,
    default: '/',
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Closed'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

leadSchema.pre('save', function(next) {
  if (!this.fullPhone) {
    this.fullPhone = `${this.countryCode} ${this.phone}`.trim();
  }
  next();
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
