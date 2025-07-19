const express = require("express");
const cors = require("cors");
const { router: authRouter } = require("./routes/auth.routes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");

const bodyParser = express.json;
const app = express();

app.use(bodyParser());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRouter);

app.use(globalErrorHandler);

module.exports = app;
