const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myUrl");

//Import schema for Person to register
const Person = require("../../models/Person");

//route - /api/auth
//for testing purpose
router.get("/", (req, res) => res.json({ test: "Auth is being tested!" }));

//route - /api/auth/register
//route for registration of users (Public)
router.post("/register", (req, res) => {
    Person.findOne({ email: req.body.email })
        .then((person) => {
            if (person) {
                return res
                    .status(400)
                    .json({ emailerror: "Email is already registered." });
            } else {
                const newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username
                });
                //Encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPerson.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPerson.password = hash;
                        newPerson
                            .save()
                            .then((person) => res.json(person)) //getting back the data which I've saved in the db. just for testing in postman
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch((err) => console.log(err));
});

//route - /api/auth/login
<<<<<<< HEAD
//route for login of users
router.post('/login', (req,res) => {
=======
//route for login of users (Public)
router.post("/login", (req, res) => {
>>>>>>> 05c1c5de91b240739b97662377d0ea0a344478b1
    const email = req.body.email;
    const password = req.body.password;

    Person.findOne({ email })
        .then((person) => {
            if (!person) {
                return res
                    .status(404)
                    .json({ emailError: "Email is not found !" });
            } else {
                bcrypt
                    .compare(password, person.password)
                    .then((isCorrect) => {
                        if (isCorrect) {
                            // return res.status(200).json({success: "Login is successfull !"});

                            // use payload and create token for user
                            const payload = {
                                id: person.id,
                                name: person.name,
                                email: person.email,
                            };
                            jwt.sign(
                                payload,
                                key.secret,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token,
                                    });
                                }
                            );
                        } else {
                            return res
                                .status(404)
                                .json({ passwordError: "Invalid Password !" });
                        }
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
});

//route - /api/auth/profile
//route for user profile (Private)
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }), (req, res) => {
        // console.log(req);
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            profilepic: req.user.profilepic
        })
    }
);

module.exports = router;
