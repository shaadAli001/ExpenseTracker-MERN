const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/userRouter");
const transactionRouter = require("./routes/transactionRoute");
const path = require("path");
// config ENV
dotenv.config();

// connect with MongoDB
connectDB();

// rest object
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// user routes
app.use("/api/v1/user", userRouter)

// transaction route
app.use("/api/v1/transaction", transactionRouter);


const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Serer Listeninig on port:${PORT}`.bgMagenta.white);
});