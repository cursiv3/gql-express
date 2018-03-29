var mongoose = require("mongoose"),
  config = require("../../config");

var itemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }
});

var Item = mongoose.model("Item", itemSchema);

export default Item;
