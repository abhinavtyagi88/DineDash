const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const jwtSecret = "secertKey"


router.post('/createuser',
[
    // username must be an email
    body('email','Invalid Email').isEmail(),
    // password must be at least 5 chars long
    body('password','Invalid Password').isLength({ min: 5 }),
  ],

  

   async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password , salt);

    
       
    try {
         await user.create({
            name:req.body.username,
            password: secPassword,
            location:req.body.location,
            email:req.body.email,
        }).then(res.json({success:true})) ;

        console.log(req.body)
    
    } catch (error) {
        console.log("-------ERROR------",error);
        res.json({success:false})
        
    }
})

router.post('/login', [
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Invalid Password').isLength({ min: 5 }),
], async (req, res) => {
  // Extract validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    let userData = await user.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try logging in with correct credentials" });
    }

    // Compare passwords
   
    const pwdCompare = await bcrypt.compare(req.body.password , userData.password)

    // const isMatch = password === userData.password; // This is a simple comparison. Use bcrypt.compare() if passwords are hashed
    if (!pwdCompare) {
      return res.status(400).json({ errors: "Try logging in with correct credentials" });
    }

    const data = {
      user:{
        id:userData.id
      }
    }

    const authToken = jwt.sign(data,jwtSecret)
    
    // Success
    return res.json({ success: true ,authToken :authToken });

  } catch (error) {
    console.log("-------LOGIN_ERROR------", error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});


module.exports = router

