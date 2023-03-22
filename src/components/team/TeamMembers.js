import React from "react";
import { useGetTeamsQuery } from "../../features/tasks/taskApi";
import SingleMember from "./SingleMember";

export default function TeamMembers() {
  const { data: teams, isLoading, isError, error } = useGetTeamsQuery();

  //decide what to render

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.error}</div>;
  } else if (!isLoading && !isError && teams?.length === 0) {
    content = <div className="notFound">No team member found!</div>;
  } else if (!isLoading && !isError && teams?.length > 0) {
    content = teams.map((team) => (
      <SingleMember name={team.name} avatar={team.avatar} key={team.id} />
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
