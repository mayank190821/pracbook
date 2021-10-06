import React from 'react';
import '../styles/landing.css'
import {makeStyles} from '@mui/styles';
const useStyles = makeStyles(Theme =>({
    container:{
        height: "100vh",
    width: "100vw",
    backgroundImage: "linear-gradient(135deg, #4d4dba 45%, #8b70e9)",
    }
}) )
function LandingPage() {
    const style = useStyles();
    return(
        <>
            <div className={style.container}>

            </div>
        </>
    )
}

export default LandingPage;

