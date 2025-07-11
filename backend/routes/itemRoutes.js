const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.getAllItems);
router.post("/", itemController.createItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

router.get("/itemNumber/:itemNumber", itemController.getItemByNumber);
router.put("/update-stock/:id", itemController.updateStock);

module.exports = router;
