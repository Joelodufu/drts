import React from "react";
import "./style/style.css";

const SummaryCard = ({ model, icon, instances }) => {
  return (
    <div className="summary-card">
      <div className="avatar">
        <img src={icon} alt={`${model} Icon`} />
      </div>
      <div className="card-content">
        <h3>{model}</h3>
        <p>Instances: {instances}</p>
      </div>
    </div>
  );
};

const SummaryGrid = () => {
  const models = [
    {
      model: "Users",
      icon: "users-icon.png", // Replace with the actual image path
      instances: 100, // Replace with the actual number of instances
    },
    {
      model: "Applicants",
      icon: "applicants-icon.png",
      instances: 50,
    },
    {
      model: "Accessors",
      icon: "accessors-icon.png",
      instances: 30,
    },
    {
      model: "Licenses",
      icon: "licenses-icon.png",
      instances: 75,
    },
  ];

  return (
    <div className="summary-grid">
      {models.map((model, index) => (
        <SummaryCard
          key={index}
          model={model.model}
          icon={model.icon}
          instances={model.instances}
        />
      ))}
    </div>
  );
};

export default SummaryGrid;
