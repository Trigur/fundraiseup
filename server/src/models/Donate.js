import { Schema, model } from 'mongoose';

const schema = new Schema({
  amount: Number,
  currency: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('donations', schema);
