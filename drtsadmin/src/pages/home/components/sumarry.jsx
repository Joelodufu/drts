import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  People,
  AssignmentInd,
  SupervisorAccount,
  Description,
} from "@mui/icons-material";
import "./style/style.css";
const modelsData = [
  {
    model: "USERS",
    instances: 100,
    icon: <People />,
    color: "#FFFFFF",
  },
  {
    model: "APPLICATIONS",
    instances: 50,
    icon: <AssignmentInd />,
    color: "#FFFFFF",
  },
  {
    model: "Accessors",
    instances: 30,
    icon: <SupervisorAccount />,
    color: "#FFFFFF",
  },
  {
    model: "LICENSE",
    instances: 75,
    icon: <Description />,
    color: "#FFFFFF",
  },
];

const SummaryCard = ({ model, icon, instances, color }) => {
  return (
    <Card style={{ backgroundColor: color }}>
      <CardContent>
        <Avatar>{icon}</Avatar>
        <Typography variant="h5" component="div">
          {model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Instances: {instances}
        </Typography>
        <Link to={`/${model.toLowerCase()}`}>
          <button>More Info</button>
        </Link>
      </CardContent>
    </Card>
  );
};

const SummaryGrid = () => {
  return (
    <div className="summary-grid">
      {modelsData.map((model, index) => (
        <SummaryCard
          key={index}
          model={model.model}
          icon={model.icon}
          instances={model.instances}
          color={model.color}
        />
      ))}
    </div>
  );
};

export default SummaryGrid;
