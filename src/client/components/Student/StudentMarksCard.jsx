import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "auto",
    maxWidth: "270px",
    height: "300px",
    minWidth: "250px",
    margin: "25px",
    position: "relative",
    // cursor: "pointer",
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)",
  },
  text: {
    marginTop: "5px !important",
  },
  icon: {
    position: "absolute",
    right: "0px",
    marginTop: "12px !important",
    marginRight: "6px !important",
    color: "white",
  },
  mediaHead: {
    position: "absolute",
    color: "white",
    padding: "15px",
    fontSize: "18px",
    textTransform: "capitalize",
  },
}));

const SectionCard = ({ props }) => {
  const classNames = useStyles();
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();

  function zeroPad(value){
    return (value<10)?"0"+value:value;
  }

  React.useEffect(() => {
    let date = new Date(new Date(props.data.dateTime).getTime());
    setDate(zeroPad(date.getDate())+"/"+zeroPad(date.getMonth()+1)+"/"+date.getFullYear());
    let h = date.getHours();
    setTime(((h===12 || h === 0)?12:zeroPad(h%12))+":"+zeroPad(date.getMinutes())+" "+((h<12)?"AM":"PM"));
  }, [props]);

  return (
    <Card className={classNames.card}>
      <Typography className={classNames.mediaHead}>
        {props.data.subject}
      </Typography>
      <CardMedia
        component="img"
        height="40%"
        image="https://gstatic.com/classroom/themes/img_graduation.jpg"
        alt="section k"
      />
      <CardContent>
        <Typography variant="body2" className={classNames.text}>
          <b>Exam Type :</b> {props.data.name}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Date :</b> {date}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Time :</b> {time}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Duration :</b> {`${props.data.duration} min.`}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Max Marks :</b> {props.data.marks}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Marks Obtained:</b> {props.data.marksObtained}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
