const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require('../models/User');
const jwt = require('jsonwebtoken')
//Register
router.post('/register', (req,res) => {
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, "process.env.Secret_Key").toString()
    }
    )
    newUser.save()
    .then(() => res.status(200).json(newUser))
    .catch((err)=> res.status(500).json(err))
})

//Login

router.post('/login',async (req,res) => {
    const user = await User.findOne({username: req.body.password})
    if(!user)
    {
        res.status(500).json({
          message : 'Username not found'
        }
        )
    }
    const password = CryptoJS.AES.decrypt(req.body.password, "process.env.Secret_Key").toString()
    
    if(password === req.body.password)
    {
       const accessToken = jwt.sign({
            id:user.id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_KEY,
        {
            expiresIn:'1d'
        })
        res.status(200).send({user,accessToken})
    }
    else
    {
        res.status(500).json({
            message : 'Password did not match'
          }
          )
    }

})


module.exports = router