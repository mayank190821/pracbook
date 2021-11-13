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

export {createFaculty};