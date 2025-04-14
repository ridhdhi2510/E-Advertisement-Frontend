import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import PaymentDetails from "./customer/PaymentDetails";
import PaymentPage from "./customer/PaymentPage";
import { UpdateMyScreen } from "./agency/UpdateMyScreen";
import { ResetPassword } from "./component/ResetPassword";
import UpdateAgencyProfile from "./agency/UpdateAgencyProfile";
import PrivateRoute from "./component/PrivateRoute";
import AdminDashboard from "./admin/adminDashboard";
import Unauthorized from "./component/Unauthorized";
import Dashboard from "./admin/Dashboard";
import SettingsPage from "./admin/SettingsPage";
import AgencyManagement from "./admin/AgencyManagement";
import HordingManagement from "./admin/HordingManagement";
import CustomerManagement from "./admin/CustomerManagement";
import PaymentManagement from "./admin/PaymentManagement";
import ViewBooking from "./customer/MyBookings";

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
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            <Route path="/admin/*" element={<AdminDashboard />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="hoardings" element={<HordingManagement/>} />
                <Route path="agencies" element={<AgencyManagement/>} />
                <Route path="customers" element={<CustomerManagement/>} />
                <Route path="payments" element={<PaymentManagement/>} />
                <Route path="settings" element={<SettingsPage/>} />
            </Route>

          </Route>

          <Route element={<PrivateRoute allowedRoles={["agency"]} />}>
            <Route path="/agency/*" element={<AgencyPage />}>
              <Route index element={<DefaultPage />} />
              <Route path="addscreen" element={<AddScreen />} />
              <Route path="update" element={<UpdateAgencyProfile />} />
              <Route path="myscreens" element={<ViewMyScreen />} />
              <Route path ="updateScreen/:id"element = {<UpdateMyScreen/>}></Route>
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={["customer"]} />}>
            <Route path="/customer/*" element={<UserPage />}>
              <Route index element={<UserDefaultPage />} />
              <Route path="update" element={<UpdateProfile />} />
              <Route path="bookhording" element={<BookHording />} />
              {/* <Route path="bookhording/payment" element={<PaymentPage />} /> */}
              <Route path="bookhording/payment" element={<PaymentPage />} />
              <Route path="paymentdetails" element={<PaymentDetails />} />
              <Route path="mybookings" element={<ViewBooking/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppTheme>
  );
}

export default App;
