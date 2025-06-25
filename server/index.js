const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoute')
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')
const uploadRoute = require('./routes/upload');

require('dotenv').config();
const cookieParser = require('cookie-parser');

// ecommercedb@278
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(express.json())
//Routes
app.use('/user' , userRouter);
app.use('/api' , categoryRouter )
app.use('/api' , productRouter )
app.use('/api', uploadRoute);

app.get("/", (req , res) => {
  res.json({ msg: "This is homepage" });
});

app.listen(PORT, () => {
  console.log("✅server is running ");
  connectToDB();
});
//connect mongodb
function connectToDB() {
  const URI = process.env.MONGODB_URL;
  mongoose.connect(URI).then(() => {
    console.log("✅Mongo DB connected succesfully");
  }).catch((err)=>{
    console.error("Error connecting to DB" , err.message)
  })
}
