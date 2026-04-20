import { useEffect, useState } from "react";

const TeamWorkflow = () => {
  useEffect(() => {
    basic();
  }, []);
  function basic() {
    console.log("team workflow");
  }
  return <div>Teamwork flow System Design</div>;
};
export default TeamWorkflow;
