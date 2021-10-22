const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB  = require('./config/database/database');
const multer = require('multer');
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const categoryRoute = require("./routes/categoryRoute");
 

require('dotenv').config({
  path:"./config/config.env"
});


//connect to mongo;
connectDB();

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images",express.static(path.join(__dirname, '/images')));



/** file uploading logic */
const diskStorage = multer.diskStorage({
  destination:(req, file , cb)=>{
    cb(null,"images")
  },
  filename:(req,file,cb)=>{ 
    console.log(file)
    // cb(null,file.originalname);
    cb(null,req.body.name);
  }
})


const upload= multer({storage:diskStorage});

app.post('/api/v1/upload',upload.single("file"),(req,res,next)=>{
  res.status(200).json({ status: true, data: { message:"file uploaded" } });

})


//access user auth route;
app.use("/api/v1/auth/",  authRoute);
app.use("/api/v1/user/",  userRoute);


//access posts route;
app.use("/api/v1/posts/",  postRoute);

//access category route;
app.use("/api/v1/category/",  categoryRoute);



module.exports = app;
