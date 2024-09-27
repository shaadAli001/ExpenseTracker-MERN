const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController");
const router = express.Router();

// add transaction
router.post("/addTransaction", addTransaction);

// Edit Route
router.post("/editTransaction", editTransaction)

// Delete Route
// Edit Route
router.post("/deleteTransaction", deleteTransaction)

// get transaction
router.post("/getTransaction", getAllTransaction);

module.exports = router;