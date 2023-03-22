import React from "react";

export default function SingleMember({ name, avatar }) {
  return (
    <div className="checkbox-container">
      <img src={avatar} alt="avatar" className="team-avater" />
      <p className="label">{name}</p>
    </div>
  );
}
