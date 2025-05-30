const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./database/Connect");
const cors = require('cors');
const userRoute = require("./routes/user");
const universityRoute = require("./routes/university");
const departmentRoute = require("./routes/department");
const courseRoute = require("./routes/course");
const forecastRoute = require("./routes/CGPAForecast");
const actualRoute = require("./routes/ActualCGPA");
const adminRoute = require("./routes/admin")

app.use(express.json());

require('dotenv').config();

app.use(cors({
  origin: '*'
}))


//routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/universities", universityRoute);
app.use("/api/v1/departments", departmentRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/forecasts", forecastRoute);
app.use("/api/v1/actuals", actualRoute);
app.use("/api/v1/admins", adminRoute)


// connect to database
const port = process.env.PORT || 2000;
const MONGO_URI = process.env.MONGO_URI
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
        console.log(`Server is listen on port ${port}...`)
    });
  } catch (error) {
    console.log(error);
  }
};

start();