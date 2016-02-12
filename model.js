var mongoose = require("mongoose");

var thingSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("thing", thingSchema);
