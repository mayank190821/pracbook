import React from "react";
import SectionCard from "./SectionCard";
import { makeStyles } from "@mui/styles";
import image from "../../images/exam.png";

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
  const sectionList = [
    {
      section: "K",
      subject: "Full Stack Technologies",
      exam: "Viva (Objective type)",
      date: "23 Nov 2021, Tuesday",
      time: "2:45 pm",
      length: "15 min.",
      questions: 20,
      marks: 20,
    },
    {
      section: "L",
      subject: "Data Structures and Algorithms",
      exam: "Coding",
      date: "20 Nov 2021, Saturday",
      time: "12:30 pm",
      length: "1 hour",
      questions: 4,
      marks: 40,
    },
    {
      section: "A",
      subject: "Competitive Programming",
      exam: "Coding",
      date: "24 Nov 2021, Wednesday",
      time: "1:00 pm",
      length: "2 hours",
      questions: 6,
      marks: 60,
    },
    {
      section: "B",
      subject: "Python Progamming",
      exam: "Viva (objective type)",
      date: "26 Oct 2021, Tuesday",
      time: "9:45 am",
      length: "30 min.",
      marks: 30,
    },
  ];

  sectionList.sort((a, b) => {
    a = a.section.toLowerCase();
    b = b.section.toLowerCase();
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  });

  return (
    <div className={classNames.cards}>
      {sectionList.length === 0 ? (
        <div className={classNames.empty}>
          <div className={classNames.imageContainer}>
            <img alt="No Class" src={image} className={classNames.image}></img>
            <h2 className={classNames.emptyHeading}>
              No Classes Found, Create One
            </h2>
          </div>
        </div>
      ) : (
        sectionList.map((data, index) => {
          return <SectionCard key={`${data.section}-${index}`} props={{ data: data, i: index }} />;
        })
      )}
    </div>
  );
};

export default CardList;
