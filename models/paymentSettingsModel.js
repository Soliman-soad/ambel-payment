const mongoose = require("mongoose");
const paymentSettingsSchema = mongoose.Schema({
  enableOnlinePayment: {
    type: Boolean,
    default: true,
  },
  enableStaffCommission: {
    type: Boolean,
    default: false,
  },
  enableTips: {
    type: Boolean,
    default: false,
  },
  invoicePrefix: {
    type: String,
  },
  paymentType: {
    type: String,
    default: "Commission",
  },
  accountingMethod: {
    type: String,
    default: "Online",
  },
  billingMethod: {
    type: String,
    default: "Manual",
  },
  billingCycle: {
    type: String,
    default: "Monthly",
  },
  tipComission: {
    type: String,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
});

paymentSettingsSchema.set("strictPopulate", false);
const paymentSettingsModel = mongoose.model(
  "paymentSettings",
  paymentSettingsSchema
);
//
module.exports = paymentSettingsModel;
