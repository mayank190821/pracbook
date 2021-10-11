import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import StudentTable from './StudentTable';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const ToolBar = styled(Toolbar)(({theme})=>({
    display:"flex",
    justifyContent:"space-between",
    height:"15%",
    margin:0,
}));
const Appbar = styled(AppBar)(({theme})=>({
    margin:0,
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const useStyles = makeStyles((Theme) => ({
    container: {
        height: "100vh",
        width: "100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
    },
    logo: {
        display: "flex",
        "& > i": {
            margin: "5px 10px",
            fontSize: "30px",
            color: "white",

        }
    },
    navContainer: {
        display: "flex",
        height: "10%",
        justifyContent: "space-between",
        padding: "20px 40px",
    },
    fas: {
        margin: "50px",
        color:"white",
    },
    table: {
        marginLeft: "20px",
        height: "80%",
    },
    searchBar: {
        width: "100%",
        height: "10%",
    }
}));

function StudentInfo() {
    const style = useStyles();
    return (
        <>
            <div className={style.container}>

                <div className={style.searchBar}>
                    <Appbar position="static">
                        <ToolBar>
                                <div className={style.logo}>
                                    <i className="fas fa-users"></i>
                                    <h1>Student Info</h1>
                                </div>
                            
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                            <Button variant="contained"><i className="fas fa-plus"></i>ADD</Button>
                        </ToolBar>
                    </Appbar>

                </div>
                <div className={style.table}>
                    <StudentTable />
                </div>
            </div>
        </>
    );
}
export default StudentInfo;