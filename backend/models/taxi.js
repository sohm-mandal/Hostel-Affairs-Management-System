const mongoose = require("mongoose");

const taxiListingSchema = new mongoose.Schema({
    from: String,
    to: String,
    date: Date,
    passengers: Number,
    passengerEmails: Array,
    lister: { type: String, required: true },
  }
  ,
  {
    timestamps: true,
  })
  ;
  
const TaxiListing = mongoose.model("taxilistings", taxiListingSchema);
module.exports = TaxiListing;
  