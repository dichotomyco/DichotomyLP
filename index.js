const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({path:"./config/config.env"});

const app = express();
app.use(bodyParser.json())

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
extended: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/lpServer');
var db = mongoose.connection;

db.on('error', ()=> console.log("error in db con"))
db.once('open', ()=> console.log("conn successful"))

app.post("/sign_up", (req,res) =>{
var email = req.body.email;
    var data = {
        "email" : email,
}
db.collection('emails').insertOne(data, (err, collection) => {
    if (err) {
        throw err; 
    }
    console.log('Data insertion succesful');
})

return res.redirect('index.html')
})

    app.get("/",(req,res) => {
        res.set({
            "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
});

app.listen(process.env.PORT,() => {
    console.log(`SERVER RUNNING AT http://localhost:${process.env.PORT}`);
})

