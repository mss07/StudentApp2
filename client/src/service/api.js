import axios from 'axios';


const URL = 'https://studentapp2-fvhj.onrender.com';

export const authenticateSignup = async (data) => {
    try
    {
        return await axios.post(`${URL}/signup`,data);
    }
    catch (error) {
        console.error("Error during signup api:", error);
    }
}

export const getAllStudents = async () => {
    try {
        return await axios.get(`${URL}/students`);
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

export const updateStudent = async (schoolId, data) => {
    try {
        return await axios.put(`${URL}/students/${schoolId}`, data);
    } catch (error) {
        console.error("Error updating student:", error);
    }
}

export const deleteStudent = async (schoolId) => {
    try {
        return await axios.delete(`${URL}/students/${schoolId}`);
    } catch (error) {
        console.error("Error deleting student:", error);
    }
}
