import React from "react";
import { useGetProjectsQuery } from "../../features/tasks/taskApi";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList() {
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

  //decide what to render

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.error}</div>;
  } else if (!isLoading && !isError && projects?.length === 0) {
    content = <div className="notFound">No Projects Found!</div>;
  } else if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => (
      <ProjectListItem
        name={project.projectName}
        color={project.colorClass}
        key={project.id}
      />
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
