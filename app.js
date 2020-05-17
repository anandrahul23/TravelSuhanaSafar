//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

const encrypt = require("mongoose-encryption");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');



mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String
});

const secret = "I have had an awesome childhood, with principles and faith good luck and blessings of god and Gurus. I want that bleesing again in my life";

userSchema.plugin(encrypt, {secret: secret, encryptedFields:["password"]})

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.route("/login")
  .get(function(req, res) {
    res.render("login" ,{
      loginMessage: "Hiii"
    });
  })
  .post(function(req, res) {

    User.findOne({
      email: req.body.userEmail,
      password: req.body.userPassword
    }, function(err, user) {

      if (!err) {
        if (user) {
          console.log("Login user found, rendering user page");
          res.render("user", {
            userName: user.name
          });
        } else {
          res.send("Either User is not registered or email and password combination is worng!!!")
        }
      }

    });

  });



app.route("/register")
  .get(function(req, res) {
    res.render("register");
  })
  .post(function(req, res) {

      const name = req.body.registerName;

      const email = req.body.registerEmail;

      User.findOne({
        email: email
      }, function(err, user) {
        if (!err) {
          if (user) {
            console.log("user  found, moving to logn page");
            res.render("login", {
              loginMessage: user.name + " is already registered, please login"
            });
          } else {
          console.log("user not found, saving in db");
            const aUser = new User({
              name: name,
              email: email,
              phone: req.body.registerPhone,
              password: req.body.registerPassword
            });
            aUser.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("User Saved Moving to login page:" + aUser);
                res.render("login", {
                  loginMessage: aUser.name + "is now registered, please login."
                });
              }
            });
          }
        }
      });
    });


      app.post("/", function(req, res) {

        console.log(req.body.city);
        let city = req.body.city;

        res.render("destination", {
          destinationCity: city
        });
      })


      app.listen(3000, function() {
        console.log("Server running on port 3000");
      });
