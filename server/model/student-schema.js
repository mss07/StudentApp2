import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  class: String,
  rollNumber: String,
  fatherName: String,
  motherName: String,
  email: String,
  schoolId:{
        type: String,
        required: true,
        unique: true
  } 
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;