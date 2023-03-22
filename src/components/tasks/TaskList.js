import React from "react";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/taskApi";
import TaskListItem from "./TaskListItem";

export default function TaskList() {
  const { projects, search } = useSelector((state) => state.filters);
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  //decide what to render

  const filterByProjects = (task) => {
    const { projectName } = task.project || {};
    const isProjectHave = projects.findIndex((el) => el === projectName);
    if (isProjectHave >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const filterBySearch = (task) => {
    return search
      ? task.taskName.trim().toLowerCase().includes(search.trim().toLowerCase())
      : true;
  };

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="error">{error.error}</div>;
  } else if (!isLoading && !isError && tasks?.length === 0) {
    content = <div className="notFound">No tasks Found!</div>;
  } else if (!isLoading && !isError && tasks?.length > 0) {
    const filteredData = tasks.filter(filterBySearch).filter(filterByProjects);

    if (filteredData?.length > 0) {
      content = filteredData.map((task) => (
        <TaskListItem task={task} key={task.id} />
      ));
    } else {
      content = <div className="notFound">No filtered Result Found!</div>;
    }
  }

  return <div className="lws-task-list">{content}</div>;
}
