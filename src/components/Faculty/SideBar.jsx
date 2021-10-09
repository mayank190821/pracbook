import React from 'react';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(Themes=>({
    containers:{
        width:"16vw",
        background:"blue",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        overflow:"hidden",
    },
    miniContainer:{
        margin: "0 auto",
    }
}))
function SideBar() {
    const style = useStyles();
    return (
        <>
            <div className={style.containers}>
                <div className = {style.miniContainer}>
                <Avatar alt="Remy Sharp" src="https://avatars.dicebear.com/api/avataaars/muditshu.svg" sx={{width:130,height:130}} />
                </div>
                <div>name</div>
                <div><a href="#">userprofile</a></div>
                <div>
                    <ul>
                        <li>ic</li>
                        <li>a</li>
                        <li>sd</li>
                        <li>sad</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar
