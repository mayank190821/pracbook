import studentModel from "../models/student.model.js";
import config from "../../config/config.js";
import jwt from "jsonwebtoken";
const createStudent = async (req, res) => {
  const student = new studentModel(req.body);
  try {
    await student.save();
    return res.status(200).json({
      message: "Student Created",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    let user = await studentModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found!" });
    if (!user.authenticate(req.body.password))
      return res.status(401).json({ error: "Email and password don't match!" });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret
    );

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.status(200).json({
      token: token,
      user: user,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};
const signOut = (req,res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Successfully Signed Out"
  });
};
//....Not Completed Yet....
const updateRecord = async(req,res) => {
  // const student = new studentModel(req.body);
  studentModel.findOneAndUpdate(
    { email: req.body.email},
    req.body ,
    { new: true },
    (err, doc) => {
      console.log(err);
      console.log(doc);
      if (err) {
        console.log("Something wrong when updating data!");
        return res.status(400).json({ message: err });
      }
      else {
        console.log(doc);
        return res.status(200).json({ message: "done" });
        
      }
    }
  );
}
export { createStudent , signIn , updateRecord , signOut};
