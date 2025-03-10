const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "PROVIDE YOUR FIRST NAME"],
    },
    lastName: {
      type: String,
      required: [true, "PROVIDE YOUR LAST NAME"],
    },
    email: {
      type: String,
      required: [true, "PROVIDE YOUR EMAIL"],
      unique: true,
      validate: [validator.isEmail, "PROVIDE VALID EMAIL"],
    },
    password: {
      type: String,
      required: [true, "ENTER  PASSWORD"],
      select: false,
      minlength: [4, "password too short"],
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // if (isModified(this.password)) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  console.log(hashedPassword);
  next();
  // }
});
userSchema.methods.matchPassword = async function (password, passwordDb) {
  return await bcrypt.compare(password, passwordDb);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
