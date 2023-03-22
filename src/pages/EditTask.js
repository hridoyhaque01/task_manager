import React from "react";
import { useParams } from "react-router-dom";
import Form from "../components/form/Form";
import { useGetTaskQuery } from "../features/tasks/taskApi";

export default function EditTask() {
  const { id } = useParams();
  const { data: taskData, isLoading, isError, error } = useGetTaskQuery(id);

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.data}</div>;
  } else if (!isLoading && !isError && taskData?.id) {
    const { taskName, deadline, id, status, teamMember, project } =
      taskData || {};
    const { name } = teamMember || {};
    const { projectName } = project || {};

    const task = {
      taskName,
      teamMember: name,
      projectName,
      deadline,
      status,
      id,
    };

    content = <Form taskData={task} />;
  }

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  );
}

// {
//   "taskName": "Task One",
//   "teamMember": {
//     "name": "Saad Hasan",
//     "avatar": "/images/avatars/sadh.png",
//     "id": 1
//   },
//   "project": {
//     "id": 1,
//     "projectName": "Scoreboard",
//     "colorClass": "color-scoreboard"
//   },
//   "deadline": "2023-03-15",
//   "id": 1,
//   "status": "inProgress"
// }

// taskName: "",
//       teamMember: "",
//       projectName: "",
//       deadline: "",
