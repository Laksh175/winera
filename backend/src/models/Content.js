import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  sectionKey: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);
export default Content;
