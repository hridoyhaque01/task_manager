import React from "react";
import ProjectList from "../projects/ProjectList";
import TeamMembers from "../team/TeamMembers";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* <!-- Projects List --> */}
      <ProjectList />
      {/* <!-- Team Members --> */}
      <TeamMembers />
    </div>
  );
}
