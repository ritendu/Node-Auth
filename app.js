const express = require("express");
const app = express();
const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require("./middlewares/error");
require("./configs/db-config");
const userRoutes = require("./routes/user.routes");
app.use(express.json());
app.use("/", userRoutes);
app.use(errorConverter);
app.use(errorHandler);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`The server is up & running on port ${PORT}`);
});
