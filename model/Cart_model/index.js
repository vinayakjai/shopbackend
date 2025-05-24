const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the schema
const cartSchema = new Schema({
  name:{type:String,required:true},
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      weight: { type: Number, required: true },
      tax:{type:Number},
      
      quantity:{type:Number,required:true},
      weightInBill:{type:String,required:true},
      category:{type:Boolean,required:true}
    },
   
  ],
});

// Create the model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
