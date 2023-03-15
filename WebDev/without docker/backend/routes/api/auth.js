const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require('../../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');


router.get('/', auth, async (req,res) =>  {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


router.post(
'/', [
    check('password', 'Pass req').not().isEmpty(),
    check('email', 'Email req').isEmail()
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user)
        {
            return res.status(400).json({errors : [{msg : 'Invalid creds'}]});  
        }
       
        const ismatch = await bcrypt.compare(password, user.password);

        if(!ismatch)
        {
            return res.status(400).json({errors : [{msg : 'Invalid creds'}]});  
        }

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



module.exports = router;