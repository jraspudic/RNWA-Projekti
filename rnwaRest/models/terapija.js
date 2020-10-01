/* ===================
   Import Node Modules
=================== */
const mongoose = require("mongoose"); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const terapijaSchema = new Schema(
  {
    naziv: { type: String, required: true },
    trajanje: { type: Number, default: 0 },
    opis: { type: String, required: true },
  },
  {
    usePushEach: true,
  }
);

module.exports = mongoose.model("Terapija", terapijaSchema);
