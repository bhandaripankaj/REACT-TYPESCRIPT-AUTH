import { Button, makeStyles } from "@material-ui/core"
import { Typography } from "@mui/material";
import { Box } from "@mui/system"



const useStyles = makeStyles({
    root:{
        display:"flex",
        justifyContent:"center",
        justifyItems:"center",
        alignContent:"center",
        alignItems:"center",
        // margin:"auto",
        marginTop:"20%",
        // maxWidth:500,
        // maxHeight:600,
        // borderRadius:10,
        // backgroundColor:"#21271eeb",
        color:"#4caf50",
        // position:"relative"
        },
  })
const Home = ()=>{
  const classes = useStyles();

    return (
        <Box className={classes.root} 
          >
<Typography variant="h1">Coming Soon.... </Typography>
  
          </Box>
    )
}
export default Home
