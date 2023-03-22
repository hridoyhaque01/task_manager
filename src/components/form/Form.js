import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddTaskMutation,
  useEditTaskMutation,
  useGetProjectsQuery,
  useGetTeamsQuery,
} from "../../features/tasks/taskApi";

export default function Form({ taskData, type }) {
  const [formData, setFormData] = useState(
    taskData || {
      taskName: "",
      teamMember: "",
      projectName: "",
      deadline: "",
    }
  );
  const navigate = useNavigate();

  const [
    addTask,
    { isLoading: addLoading, isSuccess: addTaskSuccess, isError: addError },
  ] = useAddTaskMutation();
  const [
    editTask,
    { isLoading: editLoading, isSuccess: editTaskSuccess, isError: editError },
  ] = useEditTaskMutation();

  const {
    data: teamsData,
    isSuccess: teamFetchingSuccess,
    isLoading: teamsLoading,
  } = useGetTeamsQuery();

  const {
    data: projectsData,
    isSuccess: projectFetchingSuccess,
    isLoading: projectsLoading,
  } = useGetProjectsQuery();

  let teamContent = null;
  let projectContent = null;

  if (teamFetchingSuccess && !teamsLoading && teamsData?.length > 0) {
    teamContent = teamsData.map((team) => (
      <option value={team.name} key={team.id}>
        {team.name}
      </option>
    ));
  }

  if (projectFetchingSuccess && !projectsLoading && projectsData?.length > 0) {
    projectContent = projectsData.map((project) => (
      <option value={project.projectName} key={project.id}>
        {project.projectName}
      </option>
    ));
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const findTeamMember = teamsData.find(
      (team) => team.name === formData.teamMember
    );
    const findProjects = projectsData.find(
      (project) => project.projectName === formData.projectName
    );

    const newObj = {
      taskName: formData.taskName,
      teamMember: findTeamMember,
      project: findProjects,
      deadline: formData.deadline,
      projectName: formData.projectName,
      status: "pending",
    };
    if (type) {
      addTask(newObj);
    } else {
      editTask({
        id: taskData.id,
        data: {
          ...newObj,
          status: taskData.status,
        },
      });
    }
  };

  useEffect(() => {
    if (addTaskSuccess || editTaskSuccess) {
      navigate("/");
    }
  }, [addTaskSuccess, navigate, editTaskSuccess]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required
          placeholder="Implement RTK Query"
          value={formData.taskName}
          onChange={(e) => handleChange("taskName", e.target.value)}
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        {teamsLoading ? (
          "Loading..."
        ) : (
          <select
            name="teamMember"
            id="lws-teamMember"
            required
            value={formData.teamMember}
            onChange={(e) => handleChange("teamMember", e.target.value)}
          >
            <option value="" hidden>
              Select Job
            </option>
            {teamContent}
          </select>
        )}
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>

        {projectsLoading ? (
          "Loading..."
        ) : (
          <select
            id="lws-projectName"
            name="projectName"
            required
            value={formData.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
          >
            <option value="" hidden>
              Select Project
            </option>
            {projectContent}
          </select>
        )}
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input
          type="date"
          name="deadline"
          id="lws-deadline"
          required
          value={formData.deadline}
          onChange={(e) => handleChange("deadline", e.target.value)}
        />
      </div>

      <div className="text-right">
        <button
          disabled={addLoading || editLoading}
          type="submit"
          className="lws-submit"
        >
          {type === "new" ? "Save" : "update"}
        </button>
      </div>
      {addError && <div className="error">Error adding new task!</div>}
      {editError && <div className="error">Error editing task!</div>}
    </form>
  );
}
