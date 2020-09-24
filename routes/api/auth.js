const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myUrl").secret;

//route - /api/auth
//for testing purpose
router.get('/', (req,res) => res.json({test: "Auth is being tested!"}));

//Import schema for Person to register
const Person = require("../../models/Person");

//route - /api/auth/register
//route for registration of users
router.post('/register', (req,res) => {
    Person.findOne({email: req.body.email})
        .then(person => {
            if(person){
                return res
                    .status(400)
                    .json({emailerror: "Email is already registered."});
            } else {
                const newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                //Encrypted password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPerson.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPerson.password = hash;
                        newPerson
                            .save()
                            .then(person => res.json(person)) //getting back the data which I've saved in the db. just for testing in postman
                            .catch(err => console.log(err));
                    });
                }); 
            }
        })
        .catch(err => console.log(err));
})

module.exports = router;