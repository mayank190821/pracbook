import facultyModel  from "../models/faculty.model.js";
const createFaculty = async(req, res) => {
    const faculty = new facultyModel(req.body);
    try{
        await faculty.save();
        return res.status(200).json({
            message: "problem saved"
        });
    }catch(err){
        return res.status(400).json({
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {
      let user = await facultyModel.findOne({ email: req.body.email });
      if (!user) return res.status(401).json({ error: "User not found!" });
      if (!user.authenticate(req.body.password))
        return res.status(401).json({ error: "Email and password don't match!" });
  
      const token = jwt.sign(
        {
          _id: user._id,
        },
        config.jwtSecret
      );
  
      res.cookie("ft", token, { expire: new Date() + 9999 });
  
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

  const logout = (req, res) => {
      res.clearCookie("ft");
      return res.status(200).json({
          message : "Successfully logged out"
      });
  }


export {createFaculty, login, logout};