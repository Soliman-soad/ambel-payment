const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
    },
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "A Wallet must connected with a user"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Practitioner",
    },
    amount: {
      type: Number,
      required: [true, "A wallet must have a amount"],
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
    },
    currency: {
      type: String,
      default: "usd",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled","Refunded"],
      default: "Pending",
    },
    coupon: {
      type: String,
    },
    ambelFee: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    invoice_no: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    items: [],
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    gateway: {
      type: String,
    },
    gateway_trans_id: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      index: true,
    },
    practitioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Practitioner",
      index: true
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"BusinessBranch"
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appoinment",
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminSubscription",
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package"
    },
    membershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership"
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOrder"
    },
    giftCardNumber: {
      type: String
    },
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice"
    },
    refundRequest:{
      type: String
    }
  },
  { timestamps: true }
);

TransactionSchema.index({ organization: 1, createdAt: -1 });

TransactionSchema.set('strictPopulate', false);
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
