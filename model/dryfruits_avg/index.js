const mongoose = require("mongoose");

const dryfruits_avg_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  weight: {
    type: Number,
    required:true
  },
});

const Dryfruits_avg_Info = mongoose.model("DryfruitsAvg", dryfruits_avg_Schema);

module.exports = Dryfruits_avg_Info;