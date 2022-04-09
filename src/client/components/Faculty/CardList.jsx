import React from "react";
import SectionCard from "./SectionCard";
import { makeStyles } from "@mui/styles";
import image from "../../images/exam.png";
import { fetchUpcomingExams } from "../../api/utilities.api";
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

const CardList = () => {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const exams = useSelector(getExams);
  const [examList, setExamList] = React.useState([]);
  const [intervalId, setIntervalId] = React.useState();
  const user = useSelector(getUser);
  const { id } = useParams();

  function checkStatus(exams){
    let date = (new Date()).toISOString();
    for(let i =0; i < exams.length; i++){
      if(date >= exams[i].dateTime){
        let flag = 0;
        for(let j = 0; j < user.exams.length; j++){
          if(user.exams[j].examId === exams[i]._id){
            flag = 1;
          }
        }
        if (flag === 0)
          exams[i].started = true;
        else
          exams.pop(i);
      }
    }
    return exams;
  }
  React.useEffect(() => {
    if (id && user) {
      fetchUpcomingExams(id, user.role).then((res) => {
          dispatch(loadExams(res.exams));
          if(user.role === "student"){
            let id = setInterval(() => {
              setExamList([...checkStatus(res.exams)]);
            }, 1000)
            setIntervalId(id);
          }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);
  React.useEffect(() => {
    return (() => {
      clearInterval(intervalId);
    })
  }, [intervalId]);
  
  React.useEffect(() => {
    setExamList([...exams]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exams]);

  return (
    <>
      {!exams || exams.length === 0 ? (
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
                    />
                  </Link>
                ) : (
                  <SectionCard
                    key={`${dat.section}-${dat.year}-${index}`}
                    props={dat}
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
