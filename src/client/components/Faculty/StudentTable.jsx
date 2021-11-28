import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Button } from '@mui/material';
import {CSVLink} from 'react-csv';

const StyleTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1a76d2",
        color: "white",
        fontSize: "18px",
    }
}));

const useStyle = makeStyles((Theme) => ({
    tbody: {
        textAlign: "center",
    },
    tdata: {
        padding: "5px"
    },
    paper: {
        "& ::-webkit-scrollbar": {
            display: "none",
        }
    },
}));

function createData(stName, rollNo, section, year, attendence, marks) {
    return {
        stName,
        rollNo,
        year,
        section,
        attendence,
        marks
    };
}


const columns = [
    {
        id: 'sNo',
        label: 'S.No.',
        minWidth: "10px",
        align: "center"
    },
    {
        id: 'rollNo',
        label: "Roll No.",
        Width: "50px",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'stName',
        label: "Name",
        minWidth: 100,
        align: "center",
    },
    {
        id: 'year',
        label: "Year",
        minWidth: 70,
        align: "center",
    },
    {
        id: 'section',
        label: "Section",
        minWidth: 70,
        align: "center",
    },
    {
        id: 'attendence',
        label: "Status",
        minWidth: 70,
        align: "center",
    },
    {
        id: 'marks',
        label: "Marks",
        minWidth: 70,
        align: "center",
        format: (value) => value.toFixed(2),
    }
];
  
export default function StudentTable({ results }) {
    const style = useStyle();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    React.useEffect(() => {
        if (results) {
            let data = [];
            results.forEach((student) => {
                data.push(createData(student.name, student.rollNumber, student.section, student.year, student.status, student.marks));
            })
            console.log(results);
            setRows(data);
        }
    }, [results]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }
    return (
        <>
            <Paper sx={{ width: '100%', overflow: "hidden" }} className={style.paper}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label='sticky table'>

                        <TableHead className={style.tHead}>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyleTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, height: "65px" }}
                                    >{column.label}</StyleTableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody className={style.tbody}>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.rollNo}>
                                            {columns.map((column, indexC) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id}
                                                        align={column.align} >
                                                        {indexC === 0 ? index + 1 + rowsPerPage * page : ""}
                                                        {indexC === 5 ?
                                                            <Button style={{ "backgroundColor": (value !== "P" || value !== "p") ? "#4caf50" : "red", "color": "white", "fontWeight": "600" }}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}

                                                            </Button>
                                                            : <>
                                                                {
                                                                    column.format && typeof value === 'number' ? column.format(value) : value
                                                                }
                                                            </>
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                >
                </TablePagination>
            </Paper>
            
        </>
    );
};