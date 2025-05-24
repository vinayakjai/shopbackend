const mongoose = require("mongoose");

const dryfruits_perday_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  weight: {
    type: Number,
    required:true
  },
});

const Dryfruits_perday_Info = mongoose.model("DryfruitsToday", dryfruits_perday_Schema);

module.exports = Dryfruits_perday_Info;