import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import AppTheme from "./component/AppTheme";
import Home from "./component/Home";
import axios from "axios";
import AgencyPage from "./layouts/AgencyPage";
import { AddScreen } from "./agency/AddScreen";
import DefaultPage from "./agency/DefaultPage";
import ViewMyScreen from "./agency/ViewMyScreen";
import UserPage from "./layouts/UserPage";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <AppTheme>
      {" "}
      {/* ✅ Wrap the entire router inside AppTheme */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/agency/*" element={<AgencyPage />}>
            <Route index element = {<DefaultPage/>}></Route>
            <Route path="addscreen" element={<AddScreen />}></Route>
            <Route path="myscreens" element={<ViewMyScreen/>}> </Route>
          </Route>
          <Route path="/customer" element={<UserPage/>}>
          </Route>
        </Routes>
      </Router>
    </AppTheme>
  );
}

export default App;
