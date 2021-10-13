import React from "react";
import SectionCard from "./SectionCard";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import image from "../../images/exam.png";
import { height } from "@mui/system";
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
    "&::-webkit-scrollbar":{
      display: "none",
    },
    zIndex:"-10",
    height: "100vh"
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
    // border: "2px solid red",
    // backgroundColor: "black",
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
    zIndex:"+10",
    fontFamily: "monospace",
  },
}));
const CardList = () => {
  const classNames = useStyles();
  const sectionList = [
    {
      section: "K",
      advisor: "Rupin Bhugra",
      email: "rupin.bhugra_cs19@gla.ac.in",
    },
    {
      section: "L",
      advisor: "Mayank Bhugra",
      email: "mayank.bhugra_cs19@gla.ac.in",
    },
    {
      section: "A",
      advisor: "Harsh Gautam",
      email: "harsh.gautam_cs19@gla.ac.in",
    },
    {
      section: "B",
      advisor: "Mudit Shukla",
      email: "mudit.shukla_cs19@gla.ac.in",
    },
    {
      section: "L",
      advisor: "Mayank Bhugra",
      email: "mayank.bhugra_cs19@gla.ac.in",
    },
    {
      section: "A",
      advisor: "Harsh Gautam",
      email: "harsh.gautam_cs19@gla.ac.in",
    },
    {
      section: "B",
      advisor: "Mudit Shukla",
      email: "mudit.shukla_cs19@gla.ac.in",
    },
    {
      section: "L",
      advisor: "Mayank Bhugra",
      email: "mayank.bhugra_cs19@gla.ac.in",
    },
    {
      section: "A",
      advisor: "Harsh Gautam",
      email: "harsh.gautam_cs19@gla.ac.in",
    },
    {
      section: "B",
      advisor: "Mudit Shukla",
      email: "mudit.shukla_cs19@gla.ac.in",
    },
    {
      section: "L",
      advisor: "Mayank Bhugra",
      email: "mayank.bhugra_cs19@gla.ac.in",
    },
    {
      section: "A",
      advisor: "Harsh Gautam",
      email: "harsh.gautam_cs19@gla.ac.in",
    },
    {
      section: "B",
      advisor: "Mudit Shukla",
      email: "mudit.shukla_cs19@gla.ac.in",
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
            <img src={image} className={classNames.image}></img>
            <h2 className={classNames.emptyHeading}>
              No Classes Found, Create One
            </h2>
          </div>
        </div>
      ) : (
        sectionList.map((data) => {
          return <SectionCard props={data} />;
        })
      )}
    </div>
  );
};

export default CardList;
