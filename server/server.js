const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config("./.env");
const app = require("./app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("THE SERVER HAS STARTED ON PORT :",PORT);
});

connectDb = async () => {
  try {
    await mongoose.connect(process.env.CON_STR);
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.log(error);
  }
};

connectDb();
