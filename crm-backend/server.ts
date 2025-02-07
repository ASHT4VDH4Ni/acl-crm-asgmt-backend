import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import { ResultSetHeader } from "mysql2";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "JaiShreeRam",
  database: process.env.DB_NAME || "crm_db",
});

db.connect((err) => {
  if (err) console.error("Database connection error: ", err);
  else console.log("Connected to MySQL");
});

app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, result) => {
      if (err) return res.status(500).json(err);
      
      const insertResult = result as ResultSetHeader;
      res.json({ id: insertResult.insertId, name, email, phone });
    }
  );
});

app.put("/customers/:id", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "UPDATE customers SET name=?, email=?, phone=? WHERE id=?",
    [name, email, phone, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Customer updated successfully" });
    }
  );
});

app.delete("/customers/:id", (req, res) => {
  db.query("DELETE FROM customers WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer deleted successfully" });
  });
});

app.post("/interactions", (req, res) => {
  const { customer_id, interaction_date, type, notes } = req.body;
  db.query(
    "INSERT INTO interactions (customer_id, interaction_date, type, notes) VALUES (?, ?, ?, ?)",
    [customer_id, interaction_date, type, notes],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Interaction logged successfully" });
    }
  );
});

app.get("/interactions/:customer_id", (req, res) => {
  db.query(
    "SELECT * FROM interactions WHERE customer_id = ?",
    [req.params.customer_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
