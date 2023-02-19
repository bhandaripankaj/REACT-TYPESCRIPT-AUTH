import { Box } from "@mui/system";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Avatar, Button, Checkbox, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser, signUpUser } from "../api";
import { notifyForSuccess,notifyForError } from "../helpers";

const useStyles = makeStyles({
    root:{
        display:"row",
        justifyContent:"center",
        justifyItems:"center",
        alignContent:"center",
        alignItems:"center",
        margin:"auto",
        marginTop:"10%",
        maxWidth:500,
        maxHeight:600,
        borderRadius:10,
        backgroundColor:"#21271eeb",
        color:"#ffff",
        position:"relative"
        },
        input:{
            backgroundColor:"#ffff",
            borderRadius:20,
            margin:"0px 0px 0px 0px",
            height:50,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                // borderColor: "#ffff",
                display:"none",
            },
        },
  })
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

const Auth = ()=>{
  const classes = useStyles();
  const history = useNavigate();
  const [value, setValue] = useState(0); 
 const [resp ,setResp] = useState({})
const [type,setType]=useState("")

  const [formValues, setFormValues] = useState({
    name:{
      value:'',
      error:false,
      errorMessage:'You must enter a name'
    },
    email:{
      value:"",
      error:false,
      errorMessage:'You must enter an email'
    },
    password:{
      value:'',
      error:false,
      errorMessage:'You must enter a password'
    },
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        value
      }
    })
  }
  const resetState = (e)=>{
    formValues.email.value = ""
    formValues.password.value = ""
    formValues.name.value = ""
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    let newFormValues = {...formValues}
    if(!newFormValues.email.value){
      newFormValues.email.error = true
    } else {
      newFormValues.email.error = false
    }
    if(!newFormValues.password.value){
      newFormValues.password.error = true
    } else {
      newFormValues.password.error = false
    }
    if(!newFormValues.name.value && type === "signup"){
      newFormValues.name.error = true
    } else {
      newFormValues.name.error = false
    }
    setFormValues(newFormValues)
    let resp , localValidate
    let payload = {
      email:newFormValues?.email?.value,
      name:newFormValues?.name?.value,
      password:newFormValues?.password?.value
    }
    if((!newFormValues.email.error && !newFormValues.password.error && !newFormValues.name.error && type === "signup") || (!newFormValues.email.error && !newFormValues.password.error && type === "login")) {
      localValidate = true
    }
  if(localValidate){
    if(type === "signup"){
      resp =  await signUpUser(payload)
      } else {
        delete payload.name
      resp =  await loginUser(payload)
      }
      localStorage.setItem('user', JSON.stringify(resp?.data?.data));
   }
   setResp(resp?.data)
   if(resp?.data.code === 200) {
    notifyForSuccess(resp?.data?.message)
    history('/home')
   } else if(resp?.data.code !== 200 && resp?.data.code !== 400){
    notifyForError(resp?.data?.message)

   }
  }

   return(
    <>
     <Box className={classes.root}>
        <Box display="flex" justifyContent="center">
          <Stack  direction={"row"}  alignItems={"center"} gap={0}  marginTop={5}>
            <Avatar style={{width:40,height:40}} alt="Two way"  src="spotify-logo-png-7053.png" />
             <Typography variant="h6">Spotify</Typography>
            </Stack>
        </Box>
         <Box sx={{ width: '100%',marginTop:5 }}>
      <Box >
        <Tabs 
        value={value}
         onChange={handleChange}  
         indicatorColor="primary"
         textColor="inherit"
           >
          <Tab label="Sign In" onClick={resetState} {...a11yProps(0)} 
          sx={{marginLeft:15}}/>
          <Tab label="Sign Up" onClick={resetState} {...a11yProps(1)}  sx={{marginLeft:5}}/>
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
      <Box display='flex' flexDirection={"column"} margin={"0px 30px 0px 30px"}>
      {(resp?.code === 400) && type === "login" &&(
                      <span style={{fontSize:16,color:"#f44336",marginLeft:100}} >{resp?.message}</span>
                    )}
                <form onSubmit={handleSubmit}>
                <TextField  name="email"
                fullWidth
                className={classes.input}
                    onChange={handleInput}
                    value={formValues.email.value}
                    margin="normal" type={'email'}
                    variant='outlined' placeholder="Username" />
                    {type === "login" && formValues.email.error && (
                      <span style={{fontSize:12,color:"#f44336",marginLeft:20}} >{formValues.email.errorMessage}</span>
                    )}
                <TextField name="password"
                fullWidth
                 className={classes.input}
                    onChange={handleInput}
                    value={formValues.password.value}
                    margin="normal"
                    type={'password'} variant='outlined' placeholder="Password" />
                    {type === "login" && formValues.password.error && (
                      <span style={{fontSize:12,color:"#f44336",marginLeft:20}} >{formValues.password.errorMessage}</span>
                    )}
                        <Stack direction={"row"}  alignItems={"center"} gap={1}>
                            <div></div>
                        <Checkbox  defaultChecked />
                      <Typography fontSize={14}>stay signed in</Typography>
                        </Stack>
                    <Button
                    fullWidth
                    className={classes.button} 
                    onClick={event =>  setType("login")}
                    type="submit" name="submit" 
                    variant="contained" style={{ backgroundColor: "#4caf50" }} sx={{ marginTop: 3, borderRadius: 20,}}>Sign In</Button>

                       <Button
                    onClick={e=> history("/forgot-password")}
                    sx={{ marginLeft: 15 ,textTransform:"none",color:"#90a4ae",marginTop:5}}
                > Forgot Password?</Button>
                </form>
        </Box> 
      </TabPanel>
          <TabPanel value={value} index={1}>
          <Box display='flex' flexDirection={"column"} margin={"0px 30px 0px 30px"}>
          {(resp?.code === 400) && type === "signup" &&(
                      <span style={{fontSize:16,color:"#f44336",marginLeft:120}} >{resp?.message}</span>
                    )}
                <form onSubmit={handleSubmit}>
                <TextField  name="name"
                fullWidth
                className={classes.input}
                    onChange={handleInput}
                    value={formValues.name.value}
                    margin="normal" type={'text'}
                    variant='outlined' placeholder="Name" />
                      {type === "signup" && formValues.name.error && (
                      <span style={{fontSize:12,color:"#f44336",marginLeft:20}} >{formValues.name.errorMessage}</span>
                    )}
                <TextField  name="email"
                fullWidth
                className={classes.input}
                    onChange={handleInput}
                    value={formValues.email.value}
                    margin="normal" type={'email'}
                    variant='outlined' placeholder="Username" />
                       {type === "signup" && formValues.email.error && (
                      <span style={{fontSize:12,color:"#f44336",marginLeft:20}} >{formValues.email.errorMessage}</span>
                    )}
                <TextField name="password"
                fullWidth
                 className={classes.input}
                    onChange={handleInput}
                    value={formValues.password.value}
                    margin="normal"
                    type={'password'} variant='outlined' placeholder="Password" />
                       {type === "signup" && formValues.password.error && (
                      <span style={{fontSize:12,color:"#f44336",marginLeft:20}} >{formValues.password.errorMessage}</span>
                    )}
                 
                        <Stack direction={"row"}  alignItems={"center"} gap={1}>
                            <div></div>
                        <Checkbox  defaultChecked />
                      <Typography fontSize={14}>Remember me</Typography>
                        </Stack>
                    <Button
                    fullWidth
                    className={classes.button} 
                    onClick={event =>  setType("signup")}
                    type="submit" name="submit" 
                    variant="contained" style={{ backgroundColor: "#4caf50" }} sx={{ marginTop: 3, borderRadius: 20,}}>Sign Up</Button>
                </form>
        </Box>
          </TabPanel>
    </Box>
    </Box>
    </>
   
   )
}

export default Auth
