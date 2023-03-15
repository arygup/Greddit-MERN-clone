const express = require('express');
const router = express.Router();
const Sub = require('../../models/Sub.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require("../../middleware/auth");


// make
router.post(
'/make', [
    check('name', 'Name req').not().isEmpty(),
    check('desc', 'Description req').not().isEmpty()
], [auth],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, desc, tags, banned} = req.body;
    try {
        let sb = await Sub.findOne({ name });
        if(sb)
        {
            return res.status(400).json({errors : [{msg : 'Sub already exists'}]});  
        }
        xc = {};
        xc.name = name;
        xc.desc = desc;
        xc.tags = tags;
        xc.banned = banned;
        xc.admin = req.user.id;
        sb = new Sub(xc);
        await sb.save();
        const guy = await Sub.findOne({ name });
        guy.followers.unshift({user: req.user.id});
        await guy.save();
        res.json(guy);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server err');
    }
});

// all subs
router.get('/all/:mtd', async (req,res) => {
    try {
        let pres = await Sub.find({}).sort({ date: -1 });
        //console.log(pres);
        if(req.params.mtd.toString() === "alp")
        {
            pres = await Sub.find({}).sort({ name: 1 });
        }
        if(req.params.mtd.toString() === "flw")
        {
            pres = await Sub.find({}).sort({followers : 1});
        }
        if(req.params.mtd.toString() === "bonus")
        {
            pres = await Sub.find({}).sort({ date: -1 , followers : 1});
        }
        if(!pres)
        {
            return res.status(400).json({ msg : 'Sub not found'});
        }
        res.json(pres);
    } catch(err)
    {
        console.error(err.message);
        if(err.kind = "ObjectID")
        {
            return res.status(400).json({ msg : 'Sub not found'});
        }
        res.status(500).send('server error');
    }
});


// sub by  _id
router.get('/:uid', async (req,res) => {
    try {
        const pre = await Sub.findById(req.params.uid);
        if(!pre)
        {
            return res.status(400).json({ msg : 'Sub not found'});
        }
        res.json(pre);
    } catch(err)
    {
        console.error(err.message);
        if(err.kind = "ObjectID")
        {
            return res.status(400).json({ msg : 'Sub not found'});
        }
        res.status(500).send('server error');
    }
});

// del 
router.delete('/del/:uid', auth, async (req,res) => {
    try {
        const pre = await Sub.findById(req.params.uid);
        if(!pre)
        {
            return res.status(400).json({ msg : 'Sub not found'});
        }
        if(pre.admin.toString() !== req.user.id.toString())
        {
            return res.status(400).json({ msg : 'Not authenticated'});
        }
        await Sub.findOneAndRemove( { _id: req.params.uid });
        res.json({ msg : "sub deleted"});
    } catch(err)
    {
        console.error(err.message);
        if(err.kind = "ObjectID")
        {
            return res.status(400).json({ msg : 'Sub not found'});
        }
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// follow 
router.put('/follow/:uid', auth, async (req, res) => {
    try{
        const sb = await Sub.findById(req.params.uid);
        if(sb.followers.filter(following => following.user.toString() === req.user.id).length > 0)
        {
            return res.status(400).json({ msg : 'Already following this sub'});
        }
        if(sb.requested.filter(following => following.user.toString() === req.user.id).length > 0)
        {
            return res.status(400).json({ msg : 'Already requested to follow this sub'});
        }
        if(sb.blocked.filter(following => following.user.toString() === req.user.id).length > 0)
        {
            return res.status(400).json({ msg : 'Blocked to follow this sub'});
        }
        sb.requested.unshift({user: req.user.id});
        await sb.save();
        res.json(sb.requested);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// unfollow post 
router.put('/unfollow/:uid', auth, async (req, res) => {
    try{
        const sb = await Sub.findById(req.params.uid);
        const guy2 = await User.findById(req.user.id);
        if(sb.followers.filter(follow => follow.user.toString() === req.user.id).length === 0)
        {
            return res.status(400).json({ msg : 'Not followed by you'});
        }
        if(sb.admin.toString() === req.user.id)
        {
            return res.status(400).json({ msg : 'You are the admin'});
        }
        const ri = sb.followers.map(follow => follow.user.toString()).indexOf(req.user.id);
        sb.followers.splice(ri, 1);
        sb.blocked.unshift({user: req.user.id});
        await sb.save();
        res.json({msg: "unfollowed"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// reject follow
router.put('/rej/:uid/:pid', auth, async (req, res) => {
    try{
        const sb = await Sub.findById(req.params.uid);
        const guy2 = await User.findById(req.params.pid);
        const ri = sb.requested.map(follow => follow.user.toString()).indexOf(req.params.pid);
        sb.requested.splice(ri, 1);
        await sb.save();
        res.json({msg: "rejected"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
// accept follow
router.put('/acc/:uid/:pid', auth, async (req, res) => {
    try{
        const sb = await Sub.findById(req.params.uid);
        const guy2 = await User.findById(req.params.pid);
        const ri = sb.requested.map(follow => follow.user.toString()).indexOf(req.params.pid);
        sb.requested.splice(ri, 1);
        sb.followers.unshift({user: req.params.pid});
        await sb.save();
        res.json({msg: "accepted"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;