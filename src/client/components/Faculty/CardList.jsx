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
  const user = useSelector(getUser);
  const { id } = useParams();

  React.useEffect(() => {
    console.log(id);
    if (id) {
      fetchCardDetails(id, user.role).then((res) => {
        console.log(res);
        dispatch(loadExams(res.exams));
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
              Array.from(exams).map((dat, index) => {
                return Array.from(dat).map((da, jndex) => {
                  return (
                    <SectionCard
                      key={`${da.section}-${index}`}
                      props={{ data: da, i: index }}
                    />
                  );
                });
              })}
            {user.role === "student" &&
              Array.from(exams).map((dat, index) => {
                return (
                  <Link
                    to={`/exam/instruction/${dat._id}`}
                    style={{ textDecoration: "none", height: "fit-content" }}
                  >
                    <SectionCard
                      key={`${dat.section}-${dat.year}-${index}`}
                      props={{ data: dat, i: index }}
                    />
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default CardList;
