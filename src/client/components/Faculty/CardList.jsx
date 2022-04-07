import React from "react";
import SectionCard from "./SectionCard";
import { makeStyles } from "@mui/styles";
import image from "../../images/exam.png";
import { fetchCardDetails } from "../../api/utilities.api";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadExams } from "../../redux/actions/code.action";
import { getExams, getUser } from "../../redux/selectors/code.selector";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  empty: {
    width: "100%",
    height: "100vh",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    overflowY: "scroll !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    paddingBottom: "10vh",
    zIndex: "3",
    height: "100vh",
  },
  imageContainer: {
    position: "absolute",
    margin: "auto",
    top: "0px",
    bottom: "0px",
    right: "0px",
    left: "0px",
    width: "50%",
    height: "60%",
  },
  image: {
    position: "absolute",
    margin: "auto",
    top: "0px",
    bottom: "0px",
    width: "100%",
    minHeight: "80%",
    right: "0px",
    left: "0px",
    transform: "scaleY(0.5) scaleX(0.7)",
  },
  emptyHeading: {
    textAlign: "center",
    position: "absolute",
    width: "100%",
    bottom: "10%",
    zIndex: "+3",
    fontFamily: "monospace",
  },
  head: {
    height: "20px !important",
    width: "100%",
    marginLeft: "20px",
    marginBottom: "20px",
  },
}));

const CardList = ({ location }) => {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const exams = useSelector(getExams);
  const [examList, setExamList] = React.useState([]);
  const user = useSelector(getUser);
  const { id } = useParams();

  const calcTime = (exams, res) => {
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      let date = new Date();
      let examDate =
        res[i].date.split("/")[2] +
        "-" +
        (parseInt(res[i].date.split("/")[1]) < 10
          ? `0${res[i].date.split("/")[1]}`
          : res[i].date.split("/")[1]) +
          "-" +
        res[i].date.split("/")[0] +
        "T";
      let hours = res[i].time.split(":")[0];
      if (res[i].time.split(" ")[1] === "pm") {
        if (parseInt(hours) !== 12) hours = (parseInt(hours) + 12).toString();
      } else if (parseInt(hours) === 12) hours = "00";
      let time = hours + ":" + res[i].time.split(" ")[0].split(":")[1] + ":00";
      // console.log(hours, res[i].time.split(" ")[1], time);
      let matcher = examDate + time;
      console.log(matcher, time, date);
      if (new Date(matcher) < date) {
        res[i].started = true;
      }
      matcher = new Date(matcher).getTime() + res[i].duration * 60000;
      console.log("new 1 ",matcher);
      matcher = new Date(matcher);
      console.log("new",matcher);
      if (matcher > date) {
        exams.push(res[i]);
      }
    }
    return exams;
  };

  React.useEffect(() => {
    if (id && user) {
      fetchCardDetails(id, user.role).then((res) => {
        let exams = [];
        if (user.role === "faculty") {
          res.exams.forEach((data) => {
            dispatch(loadExams(calcTime(exams, data)));
          });
        } else {
          dispatch(loadExams(calcTime(exams, res.exams)));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  // data.sort((a, b) => {
  //   a = a.section.toLowerCase();
  //   b = b.section.toLowerCase();
  //   if (a < b) return -1;
  //   else if (a > b) return 1;
  //   else return 0;
  // });
  React.useEffect(() => {
    setExamList([...exams]);
  }, [exams]);

  return (
    <>
      {!exams || !exams[0] || exams.length === 0 ? (
        <div className={classNames.empty}>
          <div className={classNames.imageContainer}>
            <img alt="No Class" src={image} className={classNames.image}></img>
            <h2 className={classNames.emptyHeading}>No Exam Found</h2>
          </div>
        </div>
      ) : (
        <>
          <Typography variant="h5" className={classNames.head}>
            <b>Upcoming Exams</b>
          </Typography>
          <div className={classNames.cards}>
            {user.role === "faculty" &&
              Array.from(examList).map((dat, index) => {
                return (
                  <SectionCard
                    key={`${dat.section}-${index}`}
                    calcTime={calcTime}
                    props={dat}
                  />
                );
              })}
            {user.role === "student" &&
              Array.from(examList).map((dat, index) => {
                return dat.started ? (
                  <Link
                    to={`/exam/instruction/${dat._id}&${user._id}`}
                    style={{ textDecoration: "none", height: "fit-content" }}
                  >
                    <SectionCard
                      key={`${dat.section}-${dat.year}-${index}`}
                      props={dat}
                      calcTime={calcTime}
                    />
                  </Link>
                ) : (
                  <SectionCard
                    key={`${dat.section}-${dat.year}-${index}`}
                    props={dat}
                    calcTime={calcTime}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default CardList;
