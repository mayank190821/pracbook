import React from "react";
import SectionCard from "./SectionCard";
import { makeStyles } from "@mui/styles";
import image from "../../images/exam.png";
import { fetchCardDetails } from "../../api/utilities.api";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadExams} from "../../redux/actions/code.action";
import { getExams } from "../../redux/selectors/code.selector";
const useStyles = makeStyles((theme) => ({
  empty: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#f1f2f6",
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
}));
const CardList = () => {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const exams = useSelector(getExams);
  const [data, setData] = React.useState([{
    name: "",
    date: "",
    duration: 0,
    subject: "",
    marks: 0,
    section: "",
    time: "",
  }]);
  React.useEffect(()=>{
    fetchCardDetails("61914f010d975acc5bace6a9").then((res) => {
      setData(res.exams);
      dispatch(loadExams(res.exams));
    });
  },[]);

  React.useEffect(()=>{
    console.log(exams);
  },[exams]);


  // data.sort((a, b) => {
  //   a = a.section.toLowerCase();
  //   b = b.section.toLowerCase();
  //   if (a < b) return -1;
  //   else if (a > b) return 1;
  //   else return 0;
  // });

  return (
    <div className={classNames.cards}>
      {!exams || !exams[0] || exams.length === 0 ? (
        <div className={classNames.empty}>
          <div className={classNames.imageContainer}>
            <img alt="No Class" src={image} className={classNames.image}></img>
            <h2 className={classNames.emptyHeading}>
              No Classes Found, Create One
            </h2>
          </div>
        </div>
      ) : (
        Array.from(exams).map((dat, index) => {
          return Array.from(dat).map((da, jndex) => {
          return (
            <Link to={`/exam/instruction/${da._id}`}>
            <SectionCard
              key={`${da.section}-${index}`}
              props={{ data: da, i: index }}
            /></Link>
          );
          });
        })
      )}
    </div>
  );
};

export default CardList;
