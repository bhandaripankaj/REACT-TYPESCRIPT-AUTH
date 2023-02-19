import { makeStyles } from "@material-ui/core";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const useStyles = makeStyles({
    root:{
        display:"flex",
        justifyContent:"center",
        justifyItems:"center",
        alignContent:"center",
        alignItems:"center",
        flexDirection:"column",
        margin:"auto",
        marginTop:"10%",
        maxWidth:500,
        maxHeight:600,
        borderRadius:10,
        backgroundColor:"#21271eeb",
        // color:"#ffff",
        position:"relative",
        color:"#4caf50"
        },
        input:{
            backgroundColor:"#ffff",
            borderRadius:20,
            height:50,
            width:400,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                // borderColor: "#ffff",
                display:"none",
            },
          
        },
        button:{
            width:400,
        }
  })


  const ForgotPassword = ()=>{
  const classes = useStyles();
  const [isForgot, setForgot] = useState(false)
const [type,setType]=useState("")

  const resetTypeState = () => {
    setForgot(!isForgot)
  }
  const [formValues, setFormValues] = useState({
    email:{
      value:"",
      error:false,
      errorMessage:'You must enter an email'
    },
    password:{
      value:'',
      error:false,
      errorMessage:'You must enter your password'
    },
    confirmPassword:{
        value:'',
        error:false,
        errorMessage:'You must enter your confirm password'
      },
      otp:{
        value:'',
        error:false,
        errorMessage:'You must enter an otp'
      },
  })
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        value
      }
    })
}
  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormValues = {...formValues}
    if(!newFormValues.email.value && type === "forgot"){
      newFormValues.email.error = true
    } else {
      newFormValues.email.error = false
    }
    if(!newFormValues.password.value && type === "setPassword"){
      newFormValues.password.error = true
    } else {
      newFormValues.password.error = false
    }
    if(!newFormValues.otp.value && type === "setPassword"){
        newFormValues.otp.error = true
      } else {
        newFormValues.otp.error = false
      }
    if(!newFormValues.confirmPassword.value && type === "setPassword"){
        newFormValues.confirmPassword.error = true
      } else if(newFormValues.confirmPassword.value && newFormValues.password.value && newFormValues.confirmPassword.value !== newFormValues.password.value){
        newFormValues.confirmPassword.error = true
        newFormValues.confirmPassword.errorMessage = "Passwords does not match"
      } else {
        newFormValues.confirmPassword.error = false
      }
    setFormValues(newFormValues)
    if(!newFormValues.password.error && !newFormValues.confirmPassword.error && type === "setPassword") {
        // setTost(true)
        // setTimeout(() => {history('/login')}, 1000);
        
       } else if (!newFormValues.email.error && type === "forgot"){
        resetTypeState()
       }
  }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <Box className={classes.root}>
        <Typography variant="h6" marginTop={5} marginBottom={5}>{!isForgot ? "Forgot Password" : "Set Password"}</Typography>
      {!isForgot &&(
        <>
        <TextField  name="email"
        className={classes.input}
        onChange={handleChange}
         error={ formValues.email.error}
         helperText={ formValues.email.error && formValues.email.errorMessage}
           value={formValues.email.value}  
          type={'email'}
          margin="normal"
         variant='outlined' placeholder="Username" />
          <Button
         className={classes.button} 
         onClick={event =>   (setType("forgot"))}
         type="submit" name="submit" 
         variant="contained" style={{ backgroundColor: "#4caf50" }} sx={{ marginTop: 10,marginBottom:5, borderRadius: 20,}}>Forgot Password</Button>
        </>
      )}   
      {isForgot &&(
        <>
          <TextField  name="otp"
        className={classes.input}
        onChange={handleChange}
         error={ formValues.otp.error}
         helperText={ formValues.otp.error && formValues.otp.errorMessage}
           value={formValues.otp.value}  
          type={'number'}
          margin="normal"
         variant='outlined' placeholder="Enter otp" />

        <TextField  name="password"
        className={classes.input}
        onChange={handleChange}
         error={ formValues.password.error}
         helperText={ formValues.password.error && formValues.password.errorMessage}
           value={formValues.password.value}  
          type={'password'}
          margin="normal"
          style={{marginTop:formValues.otp.error?30:15}}
         variant='outlined' placeholder="Password" />
         <TextField  name="confirmPassword"
        className={classes.input}
        onChange={handleChange}
         error={ formValues.confirmPassword.error}
         helperText={ formValues.confirmPassword.error && formValues.confirmPassword.errorMessage}
           value={formValues.confirmPassword.value}  
          type={'password'}
          margin="normal"
          style={{marginTop:formValues.password.error?30:15}}
         variant='outlined' placeholder="Confirm Password" />
          <Button
         className={classes.button} 
         onClick={event =>   (setType("setPassword"))}
         type="submit" name="submit" 
         variant="contained" style={{ backgroundColor: "#4caf50" }} sx={{ marginTop: 10,marginBottom:5, borderRadius: 20,}}>Change Password</Button>
        </>
      )} 
        </Box>
        </form>
        </>
    )
  }

export default ForgotPassword
