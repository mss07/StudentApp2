import express from 'express';
import { userSignup, getAllStudents, updateStudent, deleteStudent } from '../controller/user-controller.js';


const router = express.Router();
router.post('/signup', userSignup);
router.get('/students', getAllStudents);
router.put('/students/:schoolId', updateStudent);
router.delete('/students/:schoolId', deleteStudent);

export default router;