import React, { useRef } from "react";
import { Button } from "antd";
import html2pdf from "html2pdf.js";
import Logo from "../components/Logo";
import "../page_style/invoiceReceipt.css"; // <-- Custom CSS for print/mobile

const InvoiceReceipt = ({ invoiceData, onClose }) => {
  const receiptRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    html2pdf()
      .set({
        margin: 0.5,
        filename: `${invoiceData.invoiceNo}.pdf`,
        html2canvas: { scale: 3 }, // higher resolution
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="receipt-page">
      <div className="print-hide button-bar">
        <Button onClick={handlePrint} type="primary">
          🖨️ Print
        </Button>
        <Button onClick={handleDownloadPDF} type="default" style={{ margin: "0 10px" }}>
          ⬇️ PDF
        </Button>
        <Button onClick={onClose} danger>
          Close
        </Button>
      </div>

      <div ref={receiptRef} className="invoice-wrapper">
        {/* Header: Logo and Company Info */}
        <div className="invoice-header">
          <Logo size={100} />
          <p>Infront of Attar Hospital, Kharkhana Road, Takli Sikandhar</p>
          <p>Mohol, Maharashtra - 413213</p>
          <p>📞 9960145979 / 8788112887 | ✉️ prasadgaikwad202000@gmail.com</p>
        </div>

        <hr />

        <h3 className="receipt-title">🧾 Invoice Receipt</h3>

        {/* Customer Info */}
        <div className="invoice-details">
          <p><strong>Invoice No:</strong> {invoiceData.invoiceNo}</p>
          <p><strong>Date:</strong> {invoiceData.invoiceDate}</p>
          <p><strong>Customer Name:</strong> {invoiceData.customerName}</p>
          <p><strong>Mobile Number:</strong> {invoiceData.mobile_no}</p>
          <p><strong>Shipping Address:</strong> {invoiceData.shippingAddress}</p>
        </div>

        {/* Products Table */}
        <div className="table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Disc %</th>
                <th>Tax %</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.unitPrice}</td>
                  <td>{item.discount}%</td>
                  <td>{item.taxPercentage || 0}%</td>
                  <td>₹{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="invoice-totals">
          <p><strong>Total:</strong> ₹{invoiceData.totalAmount.toFixed(2)}</p>
          <p><strong>Discount:</strong> ₹{invoiceData.totalDiscount.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₹{invoiceData.totalTax.toFixed(2)}</p>
          <p><strong>Payable:</strong> ₹{invoiceData.totalPayable.toFixed(2)}</p>
          <p><strong>Paid:</strong> ₹{invoiceData.paidAmount.toFixed(2)}</p>
          <p><strong>Due:</strong> ₹{invoiceData.dueAmount.toFixed(2)}</p>
          <p><strong>Status:</strong> {invoiceData.status}</p>
          <p><strong>Payment Mode:</strong> {invoiceData.paymentMode}</p>
        </div>

        <div className="invoice-footer">
          <p><em>Thank You Visit Again! 😊🙏</em></p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceReceipt;
