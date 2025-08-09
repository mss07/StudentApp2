import { Box } from '@mui/material';

//components
import Header from './components/header/Header';
import StudentDetails from './components/Home/StudentDetails';



function App() {
  return (
    <div>
      <Header/>
      <Box style={{marginTop:80}}>
      <StudentDetails/>
      </Box>
    </div>
  );
}

export default App;
