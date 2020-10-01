/* ===================
   Import Node Modules
=================== */
const mongoose = require("mongoose"); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const pacijentSchema = new Schema(
  {
    ime: { type: String, required: true },
    prezime: { type: String, required: true },
    datumRodjenja: { type: String, required: true },
    grad: { type: String, required: true },
    zdravstveniKarton: { type: String },
    terapija: {
      _id: { type: String, default: 0 },
      naziv: { type: String, required: true },
      trajanje: { type: Number, default: 0 },
      opis: { type: String, required: true },
    },
  },
  {
    usePushEach: true,
  }
);

module.exports = mongoose.model("Pacijent", pacijentSchema);
