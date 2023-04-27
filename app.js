const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sonali:sonali@cluster0.cc0yduo.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Create a schema for the form data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  message: String,
});

// Create a model for the users collection
const User = mongoose.model("User", userSchema);

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submissions
app.post("/submit", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    message: req.body.message,
  });
  user
    .save()
    .then(() => res.send("Form submitted successfully"))
    .catch((err) => res.send(`Error submitting form: ${err.message}`));
});

// Start the server
app.listen(3000, () => console.log("Server started"));
