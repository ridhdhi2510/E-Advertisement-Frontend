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
import UserDefaultPage from "./users/UserDefaultPage";
import Profile from "./customer/Profile";
import UpdateProfile from "./customer/UpdateProfile";
import BookHording from "./customer/BookHording";
import MyBookings from "./customer/MyBookings";
import PaymentDetails from "./customer/PaymentDetails";
import PaymentPage from "./customer/PaymentPage";
import { UpdateMyScreen } from "./agency/UpdateMyScreen";
import { ResetPassword } from "./component/ResetPassword";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <AppTheme>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/agency/*" element={<AgencyPage />}>
            <Route index element={<DefaultPage />} />
            <Route path="addscreen" element={<AddScreen />} />
            <Route path="myscreens" element={<ViewMyScreen />} />
            <Route path ="updateScreen/:id"element = {<UpdateMyScreen/>}></Route>
          </Route>
          <Route path="/customer/*" element={<UserPage />}>
            <Route index element={<UserDefaultPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="updateprofile" element={<UpdateProfile />} />
            <Route path="bookhording" element={<BookHording />} />
            {/* <Route path="bookhording/payment" element={<PaymentPage />} /> */}
            <Route path="bookhording/payment" element={<PaymentPage />} />
            <Route path="paymentdetails" element={<PaymentDetails />} />
            <Route path="mybookings" element={<MyBookings />} />
          </Route>
        </Routes>
      </Router>
    </AppTheme>
  );
}

export default App;
