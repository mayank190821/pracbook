import mongoose from "mongoose";
import crypto from "crypto";

const studentModel = new mongoose.Schema({
  name: String,
  email: String,
  hashedPassword: String,
  salt: String,
  section: String,
  subjects: [String],
  upcomingExams: [String],
  completedExams: [
    {
      examId: String,
      marksObtained: Number,
      submissions: [
        {
          index: Number,
          solution: String,
        },
      ],
    },
  ],
});

studentModel
  .virtual("password")
  .set(function (input) {
    this._password = input;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(input);
  })
  .get(function () {
    return this._password;
  });

studentModel.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * (Math.random() + 0.1)) + "";
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
  },
};

export default mongoose.model("studentModel", studentModel);
