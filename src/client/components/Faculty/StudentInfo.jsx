import React from "react";
import { makeStyles } from "@mui/styles";
import StudentTable from './StudentTable';

const useStyles = makeStyles((Theme) => ({
    table: {
        marginLeft: "20px",
        height: "80%",
    }
}));

function StudentInfo() {
    const style = useStyles();
    return (
        <>
                <div className={style.table}>
                    <StudentTable />
                </div>
        </>
    );
}
export default StudentInfo;