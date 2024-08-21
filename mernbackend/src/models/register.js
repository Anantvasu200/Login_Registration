const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    linkedin: { type: String, required: true },
    mobile_number: { type: String, required: true },
    password: { type: String, required: true },
});

const Register = new mongoose.model("registeration", userSchema);
module.exports = Register;