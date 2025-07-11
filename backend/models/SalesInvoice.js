const mongoose = require("mongoose");

// Schema for products inside the invoice
const salesInvoiceItemSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.Mixed, // Can be null or ObjectId
    default: null,
  },
  itemNumber: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  taxPercentage: {
    type: Number,
    default: 0,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Main invoice schema
const salesInvoiceSchema = new mongoose.Schema(
  {
    invoiceDate: {
      type: Date,
      required: true,
    },
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.Mixed, // could be ObjectId or string
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Online"],
      default: "Cash",
    },
    shippingAddress: {
      type: String,
    },
    totalTax: {
      type: Number,
      required: true,
      min: 0,
    },
    totalDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPayable: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Partially Paid"],
      default: "Unpaid",
    },
    products: [salesInvoiceItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesInvoice", salesInvoiceSchema);
