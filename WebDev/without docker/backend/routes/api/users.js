const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require("../../middleware/auth");


// make

router.post(
'/', [
    check('uname', 'Name req').not().isEmpty(),
    check('password', 'Pass req').not().isEmpty(),
    check('lname', 'LName req').not().isEmpty(),
    check('fname', 'Uname req').not().isEmpty(),
    check('email', 'Email req').isEmail()
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fname,lname, uname, email, age, pno, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if(user)
        {
            return res.status(400).json({errors : [{msg : 'User already exists'}]});  
        }
        user = new User({fname,lname, uname, email, age, pno, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user : {id: user.id}};

        jwt.sign(payload, 
            config.get('jwttoken'), 
            { expiresIn: 36000 },
            (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server err');
    }
});

//make changes
router.post('/edit', [auth], async (req,res) => {
    const {fname, lname, pno, age} = req.body;
    try {
        const pre = await User.findOne( { _id : req.user.id });
        if(pre)
        {
            if(fname) pre.fname = fname;
            if(lname) pre.lname = lname;
            if(pno) pre.pno = pno;
            if(age) pre.age = age;
            await pre.save();
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


// my profile 
router.get('/me', [auth], async (req,res) => {
    try {
        const pre = await User.findOne( { _id : req.user.id });
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


// follow 
router.put('/follow/:uid', [auth], async (req, res) => {
    try{
        const guy = await User.findById(req.params.uid);
        const guy2 = await User.findById(req.user.id);
        if(req.params.uid === req.user.id)
        {
            return res.status(400).json({ msg : 'Cant follow yourself'});
        }
        //console.log(req.user.id);
        if(guy.followings.filter(following => following.user.toString() === req.user.id).length > 0)
        {
            return res.status(400).json({ msg : 'Already following this user'});
        }
        guy.followings.unshift({user: req.user.id});
        guy2.followers.unshift({user: req.params.uid});
        await guy2.save();
        await guy.save();
        res.json(guy.followings);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// unfollow post 
router.put('/unfollow/:uid', [auth], async (req, res) => {
    try{
        const pst = await User.findById(req.params.uid);
        const guy2 = await User.findById(req.user.id);
        //console.log(req.user.id);
        if(pst.followings.filter(follow => follow.user.toString() === req.user.id).length === 0)
        {
            return res.status(400).json({ msg : 'Not followed by you'});
        }
        const ri = pst.followings.map(follow => follow.user.toString()).indexOf(req.user.id);
        pst.followings.splice(ri, 1);
        await pst.save();
        const ri2 = guy2.followers.map(follow => follow.user.toString()).indexOf(req.params.uid);
        guy2.followers.splice(ri2, 1);
        await guy2.save();
        res.json({msg: "unfollowed"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// rmfollow post 
router.put('/rmfollow/:uid', [auth], async (req, res) => {
    try{
        const guy2 = await User.findById(req.params.uid);
        const pst = await User.findById(req.user.id);
        //console.log(req.user.id);
        if(pst.followings.filter(follow => follow.user.toString() === guy2.id.toString()).length === 0)
        {
            return res.status(400).json({ msg : 'Not followed by you'});
        }
        const ri = pst.followings.map(follow => follow.user.toString()).indexOf(pst.id.toString());
        pst.followings.splice(ri, 1);
        await pst.save();
        const ri2 = guy2.followers.map(follow => follow.user.toString()).indexOf(pst.id.toString());
        guy2.followers.splice(ri2, 1);
        await guy2.save();
        res.json({msg: "unfollowed"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});



// profile by user _id
router.get('/who/:uid', async (req,res) => {
    try {
        const pre = await User.findById(req.params.uid);
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


// all users
router.get('/all', [auth], async  (req,res) => {
    try {
        const pre = await User.find({});
        const user = await User.findById(req.user.id);
        const idArray = user.followers.map((f) => f.user.toString());
        // const pres = pre.filter((tempuser) => user.followers.filter((following) => following.user === tempuser.id).length === 0);
        // const press = pres.filter((tempuser) => tempuser.id !== user.id);
        //console.log("followers", idArray);
        //console.log("before", pre);
        const pres = pre.filter((temp) => !idArray.includes(temp._id.toString()));
        const press = pres.filter((tempuser) => tempuser.id !== user.id);
        //console.log("after", press);
        if(!press)
        {
            return res.status(400).json({ msg : 'Profile not found'});
        }
        res.json(press);
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



// save post
router.put('/save/:uid', [auth], async (req, res) => {
    try{
        const post = await Post.findById(req.params.uid);
        if(!post)
        {
            return res.status(400).json({ msg : 'No such post'});
        }
        const guy = await User.findById(req.user.id);
        // if(guy.saved.filter(ob => ob.post === req.params.id).length > 0)
        // {
        //     return res.status(400).json({ msg : 'Already saved'});
        // }
        const alreadySaved = guy.saved.some(savedPost => savedPost.post.toString() === req.params.uid);
        // console.log(alreadySaved);
        if (alreadySaved) {
            return res.status(400).json({ msg : 'Already saved' });
        }
        guy.saved.unshift({post: req.params.uid});
        await guy.save();
        res.json(guy.saved);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// remove saved
router.put('/unsave/:uid', [auth], async (req, res) => {
    try{
        const post = await Post.findById(req.params.uid);
        if(!post)
        {
            return res.status(400).json({ msg : 'No such post'});
        }
        const guy = await User.findById(req.user.id);
        // if(guy.saved.filter(ob => ob.post.toString() === req.params.uid.toString()).length === 0)
        // {
        //     return res.status(400).json({ msg : 'Not saved by you'});
        // }
        const alreadySaved = guy.saved.some(savedPost => savedPost.post.toString() === req.params.uid);
        if (!alreadySaved) {
            return res.status(400).json({ msg : 'Not saved by you' });
        }
        const ri = guy.saved.map(follow => follow.post.toString()).indexOf(req.params.uid);
        guy.saved.splice(ri, 1);
        await guy.save();
        res.json({msg: "Removed from save"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;