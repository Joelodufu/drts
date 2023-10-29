import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Applications from "./pages/applicants/index";
import DrivingSchoolPage from "./pages/drivingschool";
import DrivingTestPage from "./pages/drivingtest";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import DriversLicence from "./pages/driverslicence";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" exact element={<SignIn />}></Route>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/applications" exact element={<Applications />}></Route>
          <Route path="/license" exact element={<HomePage />}></Route>
          <Route path="/school" exact element={<DrivingSchoolPage />}></Route>
          <Route path="/test" exact element={<DrivingTestPage />}></Route>
          <Route path="/profile" exact element={<Profile />}></Route>
          <Route path="/signup" exact element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
