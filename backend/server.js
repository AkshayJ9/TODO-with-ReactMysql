const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// ✅ Fetch all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("SQL Query Error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    return res.json(data);
  });
});

// ✅ Add a new user
app.post("/users", (req, res) => {
  const sql = "INSERT INTO users (`Name`, `Email`, `Age`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("SQL Insert Error:", err);
      return res.status(500).json({ error: "Database insertion failed" });
    }
    return res.json({ message: "User added successfully", id: data.insertId });
  });
});

// ✅ Update an existing user
app.put("/update/:id", (req, res) => {
  const { id } = req.params; // ✅ Extract id from URL
  const sql =
    "UPDATE users SET `Name` = ?, `Email` = ?, `Age` = ? WHERE ID = ?";
  const values = [req.body.name, req.body.email, req.body.age, id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("SQL Update Error:", err);
      return res.status(500).json({ error: "Database update failed" });
    }
    return res.json({ message: "User updated successfully" });
  });
});

// ✅ Delete an existing user
app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("SQL Delete Error:", err);
      return res.status(500).json({ error: "Database deletion failed" });
    }
    return res.json({ message: "User deleted successfully" });
  });
});

// ✅ Start the server
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
