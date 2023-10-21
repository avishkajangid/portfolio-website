const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const favicon = require('serve-favicon');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(favicon(__dirname + '/public/img/favicon.ico')); 

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/portfolioContacts", {useNewUrlParser: true});

const contactSchema = {
    name: String,
    email: String,
    subject: String,
    message: String
  };
  
const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
    const contact = new Contact ({
        name: req.body.postName,
        email: req.body.postEmail,
        subject: req.body.postSubject,
        message: req.body.postMessage
      });
    
    const newContact = new Contact(contact);
    try{
        await newContact.save();
        console.log("Thank you for connecting!");
        res.redirect("/");
        
    } catch (error){
        console.log( { message: error.message} );;     
    }
    
});

app.listen(3000, () => {
    console.log("Server is started on port 3000");
});