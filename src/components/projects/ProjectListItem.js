import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProjects,
  removeProjects,
} from "../../features/filters/filterSlice";

export default function ProjectListItem({ name, color }) {
  const [isChecked, setIsCheked] = useState(true);
  const [project, setProject] = useState(name);
  const dispatch = useDispatch();
  const handleChecked = (e) => {
    setIsCheked(e.target.checked);
  };

  useEffect(() => {
    if (isChecked) {
      dispatch(addProjects(project));
    } else {
      dispatch(removeProjects(project));
    }
  }, [dispatch, project, isChecked]);

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={color}
        checked={isChecked}
        onChange={handleChecked}
      />
      <p className="label">{name}</p>
    </div>
  );
}
