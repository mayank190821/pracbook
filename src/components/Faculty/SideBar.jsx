import React from 'react';
import StudentInfo from './StudentInfo'
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(Themes => ({
    mainContainer: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        // overflowY:"scroll",
        backgroundColor: "#ecf0f5",

    },
    containers: {
        width: "18%",
        background: "blue",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        // overflow: "hidden",
    },
    miniContainer: {
        margin: "0 auto",
    },
    studentInfo: {
        width: "100%",
        height: "100%",
        overflow: "auto",
        "&::-webkit-scroll-thumb": {
            width: "1px",
        },
        "&::-webkit-scroll-bar":{
            width:"1px",
        },
    }
}))
function SideBar() {
    const style = useStyles();
    return (
        <>
            <div className={style.mainContainer}>
                <div className={style.containers}>
                    <div className={style.miniContainer}>
                        <Avatar alt="Remy Sharp" src="https://avatars.dicebear.com/api/avataaars/muditshu.svg" sx={{ width: 130, height: 130 }} />
                    </div>
                    <div>name</div>
                    <div><a href="w">userprofile</a></div>
                    <div>
                        <ul>
                            <li>ic</li>
                            <li>a</li>
                            <li>sd</li>
                            <li>sad</li>
                        </ul>
                    </div>
                </div>
                <div className={style.studentInfo} >
                    <StudentInfo />
                </div>
            </div>
        </>
    )
}

export default SideBar
