const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const Razorpay = require("razorpay");
require("dotenv").config();

const PORT = process.env.PORT || 3003;
const app = express();
app.use(cors());
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to database");
  }
});
app.use(bodyParser.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const { name, email, number, password } = req.body;

  const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
  const checkNumberQuery = "SELECT * FROM user WHERE number = ?";

  db.query(checkEmailQuery, [email], (err, emailResult) => {
    if (err) {
      console.error("Error checking email existence: ", err);
      res.status(500).json({ message: "Error registering user" });
    } else {
      db.query(checkNumberQuery, [number], (err, numberResult) => {
        if (err) {
          console.error("Error checking number existence: ", err);
          res.status(500).json({ message: "Error registering user" });
        } else if (emailResult.length > 0) {
          // Email already exists
          res
            .status(400)
            .json({ message: "Email already registered. Please login." });
        } else if (numberResult.length > 0) {
          // Mobile number already exists
          res.status(400).json({
            message: "Mobile number already registered. Please login.",
          });
        } else {
          // Hash the password
          bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
              console.error("Error hashing password: ", err);
              res.status(500).json({ message: "Error registering user" });
            } else {
              const signUpQuery = `INSERT INTO user (name, email, number, password) VALUES (?, ?, ?, ?)`;

              db.query(
                signUpQuery,
                [name, email, number, hashedPassword],
                (err, result) => {
                  if (err) {
                    console.error("Error registering user", err);
                    res.status(500).json({ message: "Error registering user" });
                  } else {
                    console.log("User registered successfully");
                    res
                      .status(200)
                      .json({ message: "User registered successfully" });
                  }
                }
              );
            }
          });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT name, email, number,  password FROM user WHERE email = ?`;

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Error during login: ", err);
      res.status(500).json({ message: "Error during login" });
    } else {
      if (result.length > 0) {
        const storedPasswordHash = result[0].password;

        // Compare the hashed password with the provided password
        bcrypt.compare(password, storedPasswordHash, (err, isPasswordMatch) => {
          if (err || !isPasswordMatch) {
            console.log("Invalid credentials");
            res.status(401).json({ message: "Invalid credentials" });
          } else {
            const userName = result[0].name;
            const userEmail = result[0].email;
            const userMobile = result[0].number;
            console.log("Login successful");
            res.status(200).json({
              message: "Login successful",
              userName,
              userEmail,
              userMobile,
            });
          }
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  });
});

const razorpay = new Razorpay({
  key_id: "rzp_test_1E5NDzeBvqbYBb",
  key_secret: "WvYYbFS7nqJDSWSVyWFQUWXB",
});

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "/logo.svg"));
});

app.post("/verification", (req, res) => {
  // done  validation
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const { price } = req.body;
  const currency = "INR";

  const options = {
    amount: price * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
});
