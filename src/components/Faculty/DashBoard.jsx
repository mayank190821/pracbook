import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {makeStyles} from "@mui/styles";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Add from "@mui/icons-material/Add";
import CardList  from "./CardList";
const useStyle = makeStyles((theme) => ({
  years: {
    margin: "10px",
  },
  cardBody: {
    boxShadow: "none !important",
    position:"fixed",
    width:"100%"
  },
  profileSection: {
    position: "absolute",
    right: "20px",
    // float: "right !important"
  },
  header: {
    // boxShadow: "1px 2px red",
    boxShadow: "0px 2px 10px #bbbbbb",
    zIndex: "3",
  },
}));
function DashBoard () {
    const classes = useStyle();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (
      <div>
        <Card className={classes.cardBody}>
          <CardActions className={classes.header}>
            <Stack className={classes.years} spacing={2} direction="row">
              <Button variant="outlined">1st Year</Button>
              <Button variant="outlined">2nd Year</Button>
              <Button variant="outlined">3rd Year</Button>
              <Button variant="outlined">4th Year</Button>
            </Stack>
            <Stack
              className={classes.profileSection}
              spacing={2}
              direction="row"
            >
              <Button variant="contained">
                <Add />
                &nbsp; Add
              </Button>
            </Stack>
          </CardActions>
          <div>
            <CardList />
          </div>
        </Card>
      </div>
    );
}
export default DashBoard;