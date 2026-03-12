const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const { sendContactConfirmation } = require("../utils/nodemailer");

const EXCEL_PATH = path.join(__dirname, "..", "contact_queries.xlsx");

function appendToExcel({ name, email, subject, message }) {
  let workbook;
  let worksheet;

  if (fs.existsSync(EXCEL_PATH)) {
    workbook = XLSX.readFile(EXCEL_PATH);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([
      ["Name", "Email", "Subject", "Message", "Date"],
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Queries");
  }

  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  rows.push([name, email, subject, message, new Date().toISOString()]);

  const newSheet = XLSX.utils.aoa_to_sheet(rows);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  XLSX.writeFile(workbook, EXCEL_PATH);
}

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
      
      appendToExcel({ name, email, subject, message });

     
      await sendContactConfirmation({ name, email, subject, message });

      res.json({ message: "Your query has been received. A confirmation email has been sent." });
    } catch (err) {
      console.error("Contact route error:", err);
      res.status(500).json({ error: "Failed to process your query. Please try again later." });
    }
  }
);

module.exports = router;
