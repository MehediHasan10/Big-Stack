const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// preference to upload the code to hereku or, otherwise to localhost port 3000.
const port = process.env.PORT || 3000; 

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

// mongoose
//     .connect(url)
//     .then(() => console.log('DB is connected...'))
//     .catch(err => console.log(`Error: ${err}`));   
//Database connection
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
// const db = mongoose.connection;
// db.on("open", () => console.log("DB Connection Successfull !"));
// db.on("error", (err) => console.log(err));

app.get('/', (req, res) => {
    res.send("Hi there...");
});

//Bring All routes
const auth = require('./routes/api/auth');
const questions = require('./routes/api/questions');
const profile = require('./routes/api/profile');

//routes handler
app.use("/api/auth", auth);
app.use("/api/questions", questions);
app.use("/api/profile", profile);

app.listen(port, () => console.log(`Server is running at port ${port}...`));
