import {AppBar,Toolbar,styled,Typography,Box } from '@mui/material'




const StyledHeader=styled(AppBar)`
background:green;
height:80px;
`
const Component=styled(Box)`
display:flex;
`
const Heading=styled(Typography)`
font-size:30px;
margin-top:20px;
margin-left:30px;
color:blue;

`


const Header = () =>{
    return(
        <StyledHeader>
              <Toolbar>
                <Component>
                  <img src='/images/School.jpg' alt='School logo absent' style={{width:90, marginTop:10,marginLeft:400}}/>
                  <Heading>Ryan International School</Heading>
                </Component>
              </Toolbar>
            </StyledHeader>
    )
}

export default Header;