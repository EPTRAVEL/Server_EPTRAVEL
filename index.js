const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const cookieParser = require('cookie-parser');
const tourRoute = require('./routes/tour');

dotenv.config();


//CONNECT DB
mongoose.connect(('mongodb://localhost:27017/Web2_EPTravel'), () =>{
    console.log("connect ss")
})



// app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json());

const userRoute = require('./routes/user');


//Authentication --> So sánh thông tin của người dùng vs Database



//Authorization --> bạn là ai? bạn có quyền làm gì (Phân Quyền)


//ROUTES 
app.use("/v1/auth", authRoute);
app.use("/users", userRoute);



//Tour routes
app.use("/v1/tour", tourRoute);


// cho phép dùng ảnh của user
const path = require('path');
app.use(express.static(path.join(__dirname, '/assets/image')))

// const testFolder = "./assets/image/avatar user";
// const fs = require("fs");

//Get all tour
app.use("/Tours", tourRoute);   

app.listen(8000, () => {
    console.log("Server is running.....")
    console.log(`Database listening at http://localhost:8000`);
})

//Json web token: Xác thực người dùng
 
