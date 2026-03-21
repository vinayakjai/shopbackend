const mongoose = require('mongoose');

const coldStorageSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    deposite_date: {
        type: String,
        required: true,
        
    },
    stock: {
        type: String,
        required: true,
       
    },
    reciept_no: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    purchaseRate:{
        type:String,
        
    }
}, { timestamps: true });

const ColdStorage = mongoose.model('ColdStorage', coldStorageSchema);

module.exports = ColdStorage;
