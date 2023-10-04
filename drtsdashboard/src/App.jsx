import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DriversLicese from "./pages/driverslicence/index";
import DrivingSchoolPage from "./pages/drivingschool";
import DrivingTestPage from "./pages/drivingtest";
import HomePage from "./pages/home";
import UsersPage from "./pages/users";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/license" exact element={<DriversLicese />}></Route>
          <Route path="/school" exact element={<DrivingSchoolPage />}></Route>
          <Route path="/test" exact element={<DrivingTestPage />}></Route>
          <Route path="/users" exact element={<UsersPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
