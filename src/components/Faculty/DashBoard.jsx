import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import Add from "@mui/icons-material/Add";
import CardList from "./CardList";

const useStyle = makeStyles((theme) => ({
  years: {
    margin: "10px",
  },
  cardBody: {
    boxShadow: "none !important",
    position: "fixed",
    width: "100%",
  },
  profileSection: {
    position: "absolute",
    right: "20px",
    top: "16px",
  },
  header: {
    boxShadow: "0px 2px 10px #bbbbbb",
    padding: theme.spacing(1),
    position: "relative",
    zIndex: "4 !important",
  },
}));
function DashBoard() {
  const classes = useStyle();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Card className={classes.cardBody}>
        <div className={classes.header}>
          <Stack className={classes.years} spacing={2} direction="row">
            <Button variant="outlined">1st Year</Button>
            <Button variant="outlined">2nd Year</Button>
            <Button variant="outlined">3rd Year</Button>
            <Button variant="outlined">4th Year</Button>
          </Stack>
          <Stack className={classes.profileSection} spacing={2} direction="row">
            <Button variant="contained">
              <Add />
              &nbsp; Add
            </Button>
          </Stack>
        </div>
        <div>
          <CardList />
        </div>
      </Card>
    </div>
  );
}
export default DashBoard;
