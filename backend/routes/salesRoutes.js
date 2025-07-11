const express = require("express");
const router = express.Router();
const { createSalesInvoice, getSalesInvoices } = require("../controllers/salesController");

router.post("/", createSalesInvoice);
router.get("/", getSalesInvoices);

module.exports = router;
