const mongoose = require('mongoose');


const PersonSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true 
    },
    username:{
        type: String,
        
    },
    profilepic:{
        type: String,
        default: "https://st2.depositphotos.com/1006318/5909/v/380/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg"
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('myPerson', PersonSchema);