import axios from 'axios'
// Function to create a sales invoice and associated products
const createSalesInvoice = (invoiceData) => {
  return new Promise((resolve, reject) => {
    const {
      invoiceDate,
      invoiceNo,
      customerId,
      customerName,
      paymentMode,
      totalTax,
      totalDiscount,
      totalAmount,
      grandTotal,
      paidAmount,
      dueAmount,
      status,
      note,
      products
    } = invoiceData;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return reject(new Error('Products array is missing or empty'));
    }

    // Insert into sales_invoice table
    const invoiceSQL = `
      INSERT INTO sales_invoice (
        invoice_date, invoice_no, customer_id, customer_name,
        payment_mode, total_tax, total_discount, total_amount, grand_total, paid_amount, due_amount, status, note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      invoiceSQL,
      [
        invoiceDate, invoiceNo, customerId, customerName, paymentMode,
        totalTax, totalDiscount, totalAmount, grandTotal, paidAmount, dueAmount, status, note
      ],
      (err, invoiceResult) => {
        if (err) return reject(new Error(`Invoice creation failed: ${err.message}`));

        const invoiceId = invoiceResult.insertId;

        // Prepare product values for batch insert
        const productValues = products.map((p) => [
          invoiceId,
          p.productID || null,
          p.itemNumber || null,
          p.itemName || null,
          p.quantity || 0,
          p.unitPrice || 0,
          p.discount || 0,
          p.total || 0,
        ]);

        // Insert into sales_invoice_items table
        const productSQL = `
          INSERT INTO sales_invoice_items (
            invoice_id, product_id, itemNumber, itemName,
            quantity, unitPrice, discount, total
          ) VALUES ?
        `;

        db.query(productSQL, [productValues], (err2) => {
          if (err2) return reject(new Error(`Product insert failed: ${err2.message}`));
          resolve({ invoiceId });
        });
      }
    );
  });
};

// Function to get all invoices and their associated products
const getAllSalesInvoices = () => {
  return new Promise((resolve, reject) => {
    const invoiceSQL = `SELECT * FROM sales_invoice;`;

    db.query(invoiceSQL, (err, invoices) => {
      if (err) return reject(new Error(`Failed to fetch invoices: ${err.message}`));

      const productSQL = `SELECT * FROM sales_invoice_items;`;

      db.query(productSQL, (err2, products) => {
        if (err2) return reject(new Error(`Failed to fetch products: ${err2.message}`));

        // Combine invoices with their corresponding products
        const invoicesWithProducts = invoices.map((invoice) => {
          const invoiceProducts = products.filter((product) => product.invoice_id === invoice.invoice_id);
          return { ...invoice, products: invoiceProducts };
        });

        resolve(invoicesWithProducts);
      });
    });
  });
};

module.exports = {
  createSalesInvoice,
  getAllSalesInvoices
};
