import Student from "../model/student-schema.js";


export const userSignup = async (request,response) => {
  try {
    //user ki details ko request body se le lo
    const exist = await Student.findOne({schoolId: request.body.schoolId});
    if (exist) {
      return response.status(401).json({msg: "User with this schoolId already exists"});
    }
    const user = request.body;
    const newUser =new Student(user)
    await newUser.save();
    response.status(200).json({msg: user});
  } catch (error) {
    response.status(500).json({msg: error.message});
  }
}

export const getAllStudents = async (request, response) => {
  try {
    const students = await Student.find();
    response.status(200).json(students);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
}

export const updateStudent = async (request, response) => {
  try {
    const { schoolId } = request.params;
    const updatedData = request.body;
    const updatedStudent = await Student.findOneAndUpdate(
      { schoolId },
      updatedData,
      { new: true } // new: true ensures the updated document is returned
    );
    if (!updatedStudent) {
      return response.status(404).json({ msg: 'Student not found' });
    }
    response.status(200).json(updatedStudent);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
}

export const deleteStudent = async (request, response) => {
  try {
    const { schoolId } = request.params;
    const deletedStudent = await Student.findOneAndDelete({ schoolId });
    if (!deletedStudent) {
      return response.status(404).json({ msg: 'Student not found' });
    }
    response.status(200).json({ msg: 'Student deleted successfully' });
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
}
