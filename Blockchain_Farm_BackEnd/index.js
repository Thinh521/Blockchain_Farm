const express = require("express");
require('dotenv').config();
require('morgan')
const cors = require("cors");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/index");

connectDB();

const app = express();
//
app.use(require('morgan')('dev'));

// cookie
app.use(cookieParser());


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
