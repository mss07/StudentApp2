import { Box, styled, TextField, Button, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { authenticateSignup, getAllStudents, updateStudent, deleteStudent } from '../../service/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const PageBackground = styled(Box)`
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: #58ade9ff;
`;

const Details = styled(Box)`
  border: 1px solid #000;
  padding: 32px 24px;
  border-radius: 4px;
  background-color: #e3f2fd;
  margin-top: 100px;
  margin-bottom: 80px;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
`
const Overall = styled(Box)`
  display: flex;
`

const StyledTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color:rgb(9, 12, 1);
  text-align: center;
  letter-spacing: 1px;
  margin-bottom: 24px;
`

const signupinitialvalues = {
  firstName: '',
  lastName: '',
  class: '',
  rollNumber: '',
  fatherName: '',
  motherName: '',
  email: '',
  schoolId: ''
}

const StudentListBox = styled(Box)`
  border: 1.5px solid #1976d2;
  border-radius: 6px;
  background: #f5faff;
  margin: 0 auto;
  margin-top: 32px;
  max-width: 600px;
  min-height: 120px;
  padding: 24px 20px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
`;


const StudentDetails = () => {
  const [studentlist, setStudentList] = useState([]);
  const [signup, setSignup] = useState(signupinitialvalues);
  const [open, setOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      let response = await getAllStudents();
      if (response && response.data) {
        setStudentList(response.data);
      }
    };
    fetchStudents();
  }, []);

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    if (response && response.data && response.data.msg) {
      setStudentList([...studentlist, response.data.msg]);
    }
  }

  const handleEdit = (student) => {
    setEditStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditStudent(null);
  };

  const handleUpdate = async () => {
    if (editStudent) {
      const response = await updateStudent(editStudent.schoolId, editStudent);
      if (response && response.data) {
        setStudentList(studentlist.map(s => {
          if (s.schoolId === editStudent.schoolId) {
            return response.data; // Replace with updated student
          } else {
            return s; // Keep the original student
          }
        }));
        handleClose();
      }
    }
  };

  const handleDelete = async (schoolId) => {
    const response = await deleteStudent(schoolId);
    if (response && response.status === 200) {
      setStudentList(studentlist.filter(s => s.schoolId !== schoolId));
    }
  };

  return (
    <>
    <PageBackground/>
      <Details>
        <StyledTitle>Student Details</StyledTitle>
        <Stack spacing={1}>
          <TextField label="First Name" name="firstName" onChange={onInputChange} variant="outlined" fullWidth />
          <TextField label="Last Name" name="lastName" onChange={onInputChange} variant="outlined" fullWidth />
          <TextField label="Class" name="class" onChange={onInputChange} variant="outlined" fullWidth />
          <TextField label="Roll Number" name="rollNumber" onChange={onInputChange} variant="outlined" fullWidth />
          <TextField label="Father's Name" name="fatherName" onChange={onInputChange} variant="outlined" fullWidth />
          <TextField label="Mother's Name" name="motherName" onChange={onInputChange} variant="outlined" fullWidth />
          <TextField label="Email Address" name="email" onChange={onInputChange} type="email" variant="outlined" fullWidth />
          <TextField label="School ID" name="schoolId" onChange={onInputChange} variant="outlined" fullWidth />
          <Button onClick={signupUser} variant="contained" color="primary">Submit</Button>
        </Stack>
      </Details>
      <StudentListBox>
        <StyledTitle>Student List</StyledTitle>
        {studentlist.length > 0 ? (
          //               object  unique key 
          studentlist.map((student, idx) => (
            <Box key={idx} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px', background: '#fff', position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <EditIcon sx={{ cursor: 'pointer' }} onClick={() => handleEdit(student)} />
                <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(student.schoolId)} />
              </Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {student.firstName} {student.lastName} (Class: {student.class}) - Roll: {student.rollNumber}
              </Typography>
              <Typography variant="body2">Father's Name: {student.fatherName}</Typography>
              <Typography variant="body2">Mother's Name: {student.motherName}</Typography>
              <Typography variant="body2">Email: {student.email}</Typography>
              <Typography variant="body2">School ID: {student.schoolId}</Typography>
            </Box>
          ))
        ) : (
          'Students details will be displayed here.'
        )}
      </StudentListBox>




      {/* Update Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          {editStudent && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="First Name" name="firstName" value={editStudent.firstName} fullWidth disabled />
              <TextField label="Last Name" name="lastName" value={editStudent.lastName} fullWidth disabled />
              <TextField label="Class" name="class" value={editStudent.class} fullWidth disabled />
              <TextField label="Roll Number" name="rollNumber" value={editStudent.rollNumber} fullWidth disabled />
              <TextField label="Father's Name" name="fatherName" value={editStudent.fatherName} fullWidth onChange={e => setEditStudent({ ...editStudent, fatherName: e.target.value })} />
              <TextField label="Mother's Name" name="motherName" value={editStudent.motherName} fullWidth onChange={e => setEditStudent({ ...editStudent, motherName: e.target.value })} />
              <TextField label="Email Address" name="email" value={editStudent.email} fullWidth onChange={e => setEditStudent({ ...editStudent, email: e.target.value })} />
              <TextField label="School ID" name="schoolId" value={editStudent.schoolId} fullWidth disabled />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <PageBackground/>
    </>
  )
}

export default StudentDetails;