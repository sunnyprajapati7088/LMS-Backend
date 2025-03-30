const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
  phone: { type: String, required: true, match: /^\d{10}$/ },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["admin", "instructor", "student"], default: "student" },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);