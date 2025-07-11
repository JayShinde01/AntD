const SalesInvoice = require("../models/SalesInvoice");

exports.createSalesInvoice = async (req, res) => {
  try {
    const {
      invoiceDate,
      invoiceNo,
      customerId,
      customerName,
      paymentMode,
      totalTax,
      totalDiscount,
      totalPayable,
      paidAmount,
      dueAmount,
      status,
      mobile_no,
      products
    } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products array is missing or empty" });
    }

    const newInvoice = new SalesInvoice({
      invoiceDate,
      invoiceNo,
      customerId,
      customerName,
      paymentMode,
      totalTax,
      totalDiscount,
      totalPayable,
      paidAmount,
      dueAmount,
      status,
      mobile_no,
      products
    });

    const savedInvoice = await newInvoice.save();

    res.status(200).json({ success: true, message: "Sales Invoice created successfully", invoiceId: savedInvoice._id });
  } catch (err) {
    console.error("❌ Invoice creation failed:", err);
    res.status(500).json({ success: false, message: "Invoice creation failed", error: err.message });
  }
};

exports.getSalesInvoices = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, invoices });
  } catch (err) {
    console.error("❌ Error fetching invoices:", err);
    res.status(500).json({ success: false, message: "Failed to fetch invoices", error: err.message });
  }
};
