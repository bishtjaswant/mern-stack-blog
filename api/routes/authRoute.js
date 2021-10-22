const express = require('express');
const router = express.Router();

const userModel = require('../models/User');

/* 
[register user] 
localhost:3000/api/v1/auth/register
*/
router.post('/register', async function (req, res, next) {
  try {
    const user = await new userModel(req.body);
    await user.save();
    return res.status(200).json({ status: true, data: { message: "user saved" } });
  } catch (error) {
    console.log(error)
  }
});



/* 
[login user] 
localhost:3000/api/v1/auth/login
*/
router.post('/login', async function (req, res, next) {
  try {
    let user = await userModel.findOne({ email: req.body.email }).select("+password");
    !user && res.status(400).json({ status: false,data:{ message: "wrong credentials"} });

    const isValidPassword= await user.comparePassword(req.body.password);
    console.log('isValidPassword', isValidPassword);
    !isValidPassword && res.status(400).json({ status: false,data:{ message: "wrong credentials"} });

    user ={
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic:user.profilePic,
      token:'8578uytrthbcfprofilePicrghgf'
       
  };

    return res.status(200).json({ status: 200, data:{success:true, user }});
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
