import React from "react";
import SectionCard from "./SectionCard";

const CardList = () => {
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
  ];
  
  sectionList.sort((a, b) => {
    a = a.section.toLowerCase();
    b = b.section.toLowerCase();
      if(a < b) return -1;
      else if(a > b) return 1;
      else return 0;
  })

  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {sectionList.map((data) => {
        return <SectionCard props={data} />;
      })}
    </div>
  );
};

export default CardList;
