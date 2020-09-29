const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

//Bring All routes
const auth = require('./routes/api/auth');
const questions = require('./routes/api/questions');
const profile = require('./routes/api/profile');

//parsing the json data
app.use(express.json()); 

// mongo config and connection
const url = require('./setup/myUrl').mongoUrl;
mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).catch((err) => {
    console.error(err.message); //Handles initial connection errors
    process.exit(1); // Exit process with failure
});

const db = mongoose.connection;
db.on('error', () => {
    console.log('> error occurred from the database');
});
db.once('open', () => {
    console.log('> successfully opened the database');
});
module.exports = mongoose;

//Passport middleware
app.use(passport.initialize()); //If we implement any kind of strategy,we've to configure it.
//Config for JWT strategy
require('./strategies/jwtStrategies')(passport);

//for testing purpose
app.get('/', (req, res) => {
    res.send("Hi there...");
});

//routes handler
app.use("/api/auth", auth);
app.use("/api/questions", questions);
app.use("/api/profile", profile);

// preference to upload the code to hereku or, otherwise to localhost port 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port ${port}...`));
