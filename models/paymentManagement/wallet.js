const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A Wallet must conected with a user"],
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  stripe_cus_id: {
    type: String,
  },

}, { timestamps: true });
WalletSchema.set('strictPopulate', false);
const Wallet = mongoose.model("Wallet", WalletSchema);
module.exports = Wallet;
