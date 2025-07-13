import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  InputNumber,
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Alert,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Sidebar from "../components/Sidebar";
import InvoiceReceipt from "../components/InvoiceReceipt";
import "../page_style/sales.css";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const SalesInvoice = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([
    { id: 1, name: "", quantity: 1, price: 0, discount: 0, taxPercentage: 0 },
  ]);
  const [customer, setCustomer] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState(moment());
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [paidAmount, setPaidAmount] = useState(0);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [showReceipt, setShowReceipt] = useState(false);
  const [latestInvoice, setLatestInvoice] = useState(null);
  const [totals, setTotals] = useState({
    totalAmount: 0,
    totalDiscount: 0,
    totalTaxAmount: 0,
    totalAfterDiscount: 0,
    totalPayable: 0,
    dueAmount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get("https://ambika-spare-parts.onrender.com/api/items");
        const customerRes = await axios.get("https://ambika-spare-parts.onrender.com/api/customer");
        setProducts(productRes.data);
        setCustomers(customerRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [selectedProducts, paidAmount]);

  const calculateProductAmount = (product) => {
    const discountedPrice = product.price * (1 - product.discount / 100);
    const taxAmount = discountedPrice * (product.taxPercentage / 100);
    return discountedPrice * product.quantity + taxAmount;
  };

  const calculateTotals = () => {
    let amount = 0, discount = 0, tax = 0;
    selectedProducts.forEach((product) => {
      const productTotal = product.price * product.quantity;
      const productDiscount = productTotal * (product.discount / 100);
      const productTax = (productTotal - productDiscount) * (product.taxPercentage / 100);
      amount += productTotal;
      discount += productDiscount;
      tax += productTax;
    });
    const afterDiscount = amount - discount;
    const payable = afterDiscount + tax;
    const due = payable - paidAmount;
    setTotals({
      totalAmount: amount,
      totalDiscount: discount,
      totalAfterDiscount: afterDiscount,
      totalTaxAmount: tax,
      totalPayable: payable,
      dueAmount: due,
    });
  };

  const handleProductChange = (index, key, value) => {
    const updated = [...selectedProducts];
    if (key === "name") {
      const prod = products.find((p) => p.itemName === value);
      if (prod) {
        updated[index] = {
          ...updated[index],
          name: prod.itemName,
          price: prod.unitPrice || 0,
          discount: prod.discount || 0,
          taxPercentage: prod.tax || 0,
          productID: prod._id,
          itemNumber: prod.itemNumber || "",
        };
      }
    } else {
      updated[index][key] = value;
    }
    setSelectedProducts(updated);
  };

  const addProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { id: Date.now(), name: "", quantity: 1, price: 0, discount: 0, taxPercentage: 0 },
    ]);
  };

  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const handleCreateInvoice = async () => {
    const selectedCustomer = customers.find((c) => c._id === customer);
    if (!selectedCustomer) {
      setAlert({ show: true, type: "error", message: "Please select a valid customer." });
      return;
    }
    const status = paidAmount >= totals.totalPayable ? "Paid" : paidAmount > 0 ? "Partially Paid" : "Unpaid";
    const payload = {
      invoiceDate: invoiceDate.format("YYYY-MM-DD"),
      invoiceNo: `INV${Date.now()}`,
      customerId: selectedCustomer._id,
      customerName: selectedCustomer.fullName,
      mobile_no: selectedCustomer.phoneMobile,
      shippingAddress,
      paymentMode,
      totalAmount: totals.totalAmount,
      totalDiscount: totals.totalDiscount,
      totalTax: totals.totalTaxAmount,
      totalPayable: totals.totalPayable,
      paidAmount,
      dueAmount: totals.dueAmount,
      status,
      products: selectedProducts.map((p) => ({
        productID: p.productID || 0,
        itemNumber: p.itemNumber || "",
        itemName: p.name,
        quantity: p.quantity,
        unitPrice: p.price,
        discount: p.discount,
        taxPercentage: p.taxPercentage || 0,
        total: calculateProductAmount(p),
      })),
    };

    try {
      await axios.post("https://ambika-spare-parts.onrender.com/api/sales", payload);
      for (const product of selectedProducts) {
        await axios.put(`https://ambika-spare-parts.onrender.com/api/items/update-stock/${product.productID}`, {
          quantitySold: product.quantity,
        });
      }
      setAlert({ show: true, type: "success", message: "Invoice created successfully ✅" });
      setLatestInvoice(payload);
      setShowReceipt(true);
    } catch (error) {
      console.error(error);
      setAlert({ show: true, type: "error", message: "Failed to create invoice ❌" });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: "24px", background: "#fff" }}>
          <Title level={2} style={{ textAlign: "center" }}>Sales Invoice</Title>

          {alert.show && (
            <Alert
              type={alert.type}
              message={alert.message}
              showIcon
              closable
              onClose={() => setAlert({ ...alert, show: false })}
              style={{ marginBottom: 20 }}
            />
          )}

          <Card title="Product Details" style={{ marginBottom: 24 }}>
            <Row gutter={[8, 8]} className="product-header-row" style={{ fontWeight: "bold" }}>
              <Col xs={24} sm={12} md={5}>Product Name</Col>
              <Col xs={12} sm={6} md={3}>Qty</Col>
              <Col xs={12} sm={6} md={3}>Price</Col>
              <Col xs={12} sm={6} md={3}>Discount %</Col>
              <Col xs={12} sm={6} md={3}>Tax %</Col>
              <Col xs={24} sm={12} md={3}>Total</Col>
              <Col xs={24} md={3}>Remove</Col>
            </Row>

          {selectedProducts.map((product, index) => (
  <Row gutter={[8, 8]} key={product.id} align="middle" className="product-row">
    <Col xs={24} sm={12} md={5}>
      <label className="field-label">Product Name</label>
      <Select
        showSearch
        value={product.name}
        placeholder="Select Product"
        style={{ width: "100%" }}
        className="product-select"
        onChange={(val) => handleProductChange(index, "name", val)}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {products
          .filter((p) => {
            const isAlreadySelected = selectedProducts.some(
              (selected, i) => selected.name === p.itemName && i !== index
            );
            return p.stock > 0 && !isAlreadySelected;
          })
          .map((p) => (
            <Option key={p._id} value={p.itemName}>
              {p.itemName}
            </Option>
          ))}
      </Select>
    </Col>
    <Col xs={12} sm={6} md={3}>
      <label className="field-label">Qty</label>
      <InputNumber
        min={1}
        value={product.quantity}
        onChange={(val) => handleProductChange(index, "quantity", val)}
        style={{ width: "100%" }}
      />
    </Col>
    <Col xs={12} sm={6} md={3}>
      <label className="field-label">Price</label>
      <InputNumber
        value={product.price}
        onChange={(val) => handleProductChange(index, "price", val)}
        style={{ width: "100%" }}
      />
    </Col>
    <Col xs={12} sm={6} md={3}>
      <label className="field-label">Discount %</label>
      <InputNumber
        value={product.discount}
        onChange={(val) => handleProductChange(index, "discount", val)}
        style={{ width: "100%" }}
      />
    </Col>
    <Col xs={12} sm={6} md={3}>
      <label className="field-label">Tax %</label>
      <InputNumber
        value={product.taxPercentage}
        onChange={(val) => handleProductChange(index, "taxPercentage", val)}
        style={{ width: "100%" }}
      />
    </Col>
    <Col xs={24} sm={12} md={3}>
      <label className="field-label">Total</label>
      <InputNumber
        readOnly
        value={calculateProductAmount(product).toFixed(2)}
        style={{ width: "100%" }}
      />
    </Col>
    <Col xs={24} md={3}>
      <label className="field-label">Remove</label>
      <Button
        icon={<MinusCircleOutlined />}
        danger
        onClick={() => removeProduct(product.id)}
        block
      />
    </Col>
  </Row>
))}

            <Button icon={<PlusOutlined />} onClick={addProduct} style={{ marginTop: 12 }}>
              Add Product
            </Button>
          </Card>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Card title="Customer Info">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Select
                    showSearch
                    placeholder="Select Customer"
                    value={customer}
                    onChange={(value) => {
                      setCustomer(value);
                      const match = customers.find((c) => c._id === value);
                      if (match?.address) setShippingAddress(match.address);
                    }}
                    filterOption={(input, option) => {
                      const c = customers.find(c => c._id === option.value);
                      return c?.fullName.toLowerCase().includes(input.toLowerCase()) || c?.phoneMobile.includes(input);
                    }}
                    style={{ width: "100%" }}
                  >
                    {customers.map(c => (
                      <Option key={c._id} value={c._id}>
                        {`${c.fullName} - ${c.phoneMobile}`}
                      </Option>
                    ))}
                  </Select>
                  <DatePicker value={invoiceDate} onChange={setInvoiceDate} style={{ width: "100%" }} />
                  <Input
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Invoice Summary">
                <p>Total Amount: ₹{totals.totalAmount.toFixed(2)}</p>
                <p>Total Discount: ₹{totals.totalDiscount.toFixed(2)}</p>
                <p>Amount After Discount: ₹{totals.totalAfterDiscount.toFixed(2)}</p>
                <p>Total Tax: ₹{totals.totalTaxAmount.toFixed(2)}</p>
                <p><strong>Total Payable: ₹{totals.totalPayable.toFixed(2)}</strong></p>

                <Select
                  value={paymentMode}
                  onChange={(val) => setPaymentMode(val)}
                  style={{ width: "100%", marginBottom: 10 }}
                >
                  <Option value="Cash">Cash</Option>
                  <Option value="Online">Online</Option>
                </Select>

                <InputNumber
                  placeholder="Paid Amount"
                  value={paidAmount}
                  onChange={setPaidAmount}
                  style={{ width: "100%", marginBottom: 10 }}
                />
                <p>Due Amount: ₹{totals.dueAmount.toFixed(2)}</p>
                <Button type="primary" onClick={handleCreateInvoice} block>
                  Create Invoice
                </Button>
              </Card>
            </Col>
          </Row>

          {showReceipt && latestInvoice && (
            <div style={{
              position: "fixed",
              top: 0, left: 0,
              width: "100%", height: "100%",
              background: "#fff9", zIndex: 1000
            }}>
              <InvoiceReceipt
                invoiceData={latestInvoice}
                onClose={() => setShowReceipt(false)}
              />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SalesInvoice;
