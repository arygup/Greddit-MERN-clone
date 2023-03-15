const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require("../../middleware/auth");
const profile = require('../../models/Profile.js');
const User = require('../../models/Profile.js');
const Post = require('../../models/Post.js');

// public route  


// make post
router.post('/make/:uid', [ auth, [
    check('text', 'text is required').not().isEmpty(),
    check('heading', 'text is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    const sb = await Sub.findById(req.params.uid);
    if(!sb)
    {
        return res.status(400).json({ msg : 'Sub not found'});
    }
    if(!(sb.followers.filter(following => following.user.toString() === req.user.id).length > 0))
    {
        return res.status(400).json({ msg : 'Not a part of sub'});
    }
    try{
        const newpost = new Post({
            text: req.body.text,
            heading: req.body.heading,
            user: req.user.id,
            sub: req.params.uid,
            tags: req.body.tags,
            adbl: 0
        });
        const post = await newpost.save();
        sb.pst.unshift({post: post._id.toString()});
        await sb.save();
        res.json(post);
    } catch (err)
    {
        console.error(err.message);
        res.status(500).send('server err');
    }
});

// post by post id
router.get('/:pid', async (req,res) => {
    try {
        const pst = await Post.findById(req.params.pid);
        if(!pst)
        {
            return res.status(400).json({ msg : 'Post not found'});
        }
        const sb = await Sub.findById(pst.sub.toString());
        if(!sb)
        {
            return res.status(400).json({ msg : 'Post not found'});
        }
        res.json(pst);
    } catch(err)
    {
        console.error(err.message);
        if(err.kind = "ObjectID")
        {
            return res.status(400).json({ msg : 'Post not found'});
        }
        res.status(500).send('server error');
    }
});

// all posts
router.get('/', auth, async (req,res) => {
    try {
        const psts = await Post.find().sort({ date: -1 });
        if(!psts)
        {
            return res.status(400).json({ msg : 'No posts'});
        }
        res.json(psts);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// like post
router.put('/like/:pid', auth, async (req, res) => {
    try{
        const pst = await Post.findById(req.params.pid);
        if(pst.likes.filter(like => like.user.toString() === req.user.id).length > 0)
        {
            return res.status(400).json({ msg : 'Already liked by user'});
        }
        pst.likes.unshift({user: req.user.id});
        await pst.save();
        res.json(pst.likes);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// unlike post 
router.put('/unlike/:pid', auth, async (req, res) => {
    try{
        const pst = await Post.findById(req.params.pid);
        if(pst.likes.filter(like => like.user.toString() === req.user.id).length === 0)
        {
            return res.status(400).json({ msg : 'Not liked by user'});
        }

        const ri = pst.likes.map(like => like.user.toString()).indexOf(req.user.id);
        pst.likes.splice(ri, 1);
        await pst.save();
        res.json({msg: "disliked"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// make comment
router.post('/comment/:pid', [ auth, [
    check('text', 'text is required').not().isEmpty()  
]], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    const pst = await Post.findById(req.params.pid);
    if(!pst)
    {
        return res.status(400).json("no such post");
    }
    const sb = await Sub.findById(pst.sub);
    if(!sb)
    {
        return res.status(400).json({ msg : 'Sub not found'});
    }
    if(!(sb.followers.filter(following => following.user.toString() === req.user.id).length > 0))
    {
        return res.status(400).json({ msg : 'Not a part of sub'});
    }
    try{
        const cmt = {
            text: req.body.text,
            user: req.user.id
        };
        pst.comments.unshift(cmt);
        await pst.save();
        res.json(pst.comments); 
    } catch (err)
    {
        console.error(err.message);
        res.status(500).send('server err');
    }
});


// report
router.post('/report/:pid', [auth] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    const pst = await Post.findById(req.params.pid);
    if(!pst)
    {
        return res.status(400).json("no such post");
    }
    const sb = await Sub.findById(pst.sub);
    if(!sb)
    {
        return res.status(400).json({ msg : 'Sub not found'});
    }
    if(!(sb.followers.filter(following => following.user.toString() === req.user.id).length > 0))
    {
        return res.status(400).json({ msg : 'Not a part of sub'});
    }
    try{
        const cmt = {
            concern: req.body.concern,
            user: req.user.id
        };
        pst.report.unshift(cmt);
        await pst.save();
        res.json(pst.report); 
    } catch (err)
    {
        console.error(err.message);
        res.status(500).send('server err');
    }
});


// anon 
router.put('/anon/:pid', auth, async (req, res) => {
    try{
        const pst = await Post.findById(req.params.pid);
        const sb = await Sub.findById(pst.sub);
        const adm = sb.admin;
        if(req.user.id !== adm.toString())
        {
            return res.status(400).json({ msg : 'Not admin'});
        }
        pst.user = "000000000000000000000000";
        await pst.save();
        res.json({msg: "Anon"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// del 
router.put('/dell/:pid', auth, async (req, res) => {
    try{
        const pst = await Post.findById(req.params.pid);
        const sb = await Sub.findById(pst.sub);
        const adm = sb.admin;
        if(req.user.id !== adm.toString())
        {
            return res.status(400).json({ msg : 'Not admin'});
        }
        pst.sub = "000000000000000000000000";
        await pst.save();
        res.json({msg: "deleted"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// fade
router.put('/fad/:pid', auth, async (req, res) => {
    try{
        const pst = await Post.findById(req.params.pid);
        const sb = await Sub.findById(pst.sub);
        const adm = sb.admin;
        if(req.user.id !== adm.toString())
        {
            return res.status(400).json({ msg : 'Not admin'});
        }
        pst.adbl = 1;
        await pst.save();
        res.json({msg: "faded"});
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;