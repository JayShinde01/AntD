const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/", customerController.getAllCustomers);
router.get("/:phoneMobile", customerController.getCustomerByPhone);
router.post("/", customerController.addCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
