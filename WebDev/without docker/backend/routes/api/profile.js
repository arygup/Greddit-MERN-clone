const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const profile = require('../../models/Profile.js');
const User = require('../../models/Profile.js');
const { check, validationResult } = require('express-validator/check');


// my profile 
router.get('/me', auth, async (req,res) => {
    try {
        const pre = await profile.findOne( { user: req.user.id }).populate('user', ['uname', 'email', 'fname', 'lname']);
        if(!pre)
        {
            return res.status(400).json({ msg : 'No such user'});
        }
        res.json(pre);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// make update profile
router.post('/', [ auth], async (req,res) => {
    const {fname, lname, pno, age} = req.body;
    const prfile = {};
    prfile.user = req.user.id;
    if(fname) prfile.fname = fname;
    if(lname) prfile.lname = lname;
    if(pno) prfile.pno = pno;
    if(age) prfile.age = age;
    try {
        let pre = await profile.findOne( { user: req.user.id });
        if(pre)
        {
            pre = await profile.findOneAndUpdate({ user: req.user.id }, { $set: prfile});
            return res.json(pre);
        }
        pre = new profile(prfile);
        await pre.save();
        return res.json(pre);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
} );



// all users profile
router.get('/', async (req,res) => {
    try {
        const pres = await profile.find().populate('user', ['uname', 'email', 'fname', 'lname']);
        res.json(pres);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// profile by user _id
router.get('/user/:uid', async (req,res) => {
    try {
        const pre = await profile.findOne( { user: req.params.uid }).populate('user', ['uname', 'email', 'fname', 'lname']);
        if(!pre)
        {
            return res.status(400).json({ msg : 'Profile not found'});
        }
        res.json(pre);
    } catch(err)
    {
        console.error(err.message);
        if(err.kind = "ObjectID")
        {
            return res.status(400).json({ msg : 'Profile not found'});
        }
        res.status(500).send('server error');
    }
});


// del user and profile
router.delete('/', auth, async (req,res) => {
    try {
        await profile.findOneAndRemove( { user: req.user.id });
        await User.findOneAndRemove( { _id: req.user.id });
        res.json({ msg : "user deleted"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});





module.exports = router;

// .populate('user', ['uname', 'email'])