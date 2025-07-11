const Customer = require("../models/Customer");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).send("DB Error");
  }
};

exports.getCustomerByPhone = async (req, res) => {
  try {
    const customer = await Customer.findOne({ phoneMobile: req.params.phoneMobile });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const exists = await Customer.findOne({ phoneMobile: req.body.phoneMobile });
    if (exists) return res.status(400).json({ message: "exists" });

    const newCustomer = new Customer(req.body);
    const saved = await newCustomer.save();

    res.status(200).json({ message: "success", id: saved._id });
  } catch (err) {
    res.status(500).send("Insert failed");
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "updated" });
  } catch (err) {
    res.status(500).send("Update failed");
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    res.status(500).send("Delete failed");
  }
};
