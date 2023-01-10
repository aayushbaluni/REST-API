//authentication -> process of identifying 
//authorisation -> if user have rights to perform
const bcrypt = require('bcrypt');
const _ = require("lodash");
const { User, validate } = require('./users');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const { err } = validate(req.body);
    if (err) return res.status(400).send(err.details[0].message);

    //if user not regustered
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send("User already registered.");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    user=new User(_.pick(req.body,['name','email','password']))
    await user.save();

    
    res.send(_.pick(user, ['id','name', 'email'])); 

});






module.exports = router;