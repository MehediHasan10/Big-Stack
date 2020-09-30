const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Loading the Models
const Profile = require("../../models/Profile");
const Person = require("../../models/Person");

//GET route - /api/profile/
//route for personal user profile (Private)
router.get(
    '/', 
    passport.authenticate("jwt", {session:false}),
    (req,res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if(!profile){
                    res.status(404).json({ profileNOtFound: "No Profile Found !"});
                }
                res.json(profile);
            })
            .catch(err => console.log(err));
});

//POST route - /api/profile/
//route for personal user profile (Private)
router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        const profileValues = {};
        profileValues.user = req.user.id;
        if(req.body.username) profileValues.username = req.body.username;
        if(req.body.website) profileValues.website = req.body.website;
        if(req.body.country) profileValues.country = req.body.country;
        if(req.body.portfolio) profileValues.portfolio = req.body.portfolio;
        if(typeof languages !== 'undefined') {
            profileValues.languages = req.body.languages.split(',');
        };
        if(req.body.youtube) profileValues.youtube = req.body.youtube;
        if(req.body.facebook) profileValues.facebook = req.body.facebook;
        if(req.body.instagram) profileValues.instagram = req.body.instagram;
    }
    )


module.exports = router;