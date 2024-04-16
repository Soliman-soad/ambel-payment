const mongoose = require('mongoose');

const InvoiceCounterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "invoiceCounter"
    },
    counter: {
        type: Number,
        required: true,
        default: 0
    }
})

InvoiceCounterSchema.set('strictPopulate', false);
module.exports = new mongoose.model('InvoiceCounter', InvoiceCounterSchema)