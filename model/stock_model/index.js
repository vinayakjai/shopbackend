const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the schema
const stockSchema = new Schema({
  name: { type: String, required: true },
 
  current_stock:{type:Number},
  minimum_stock_signal:{type:Number}
});

// Create the model
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
