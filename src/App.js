import ForgotPassword from "./components/user/forgotPassword";
import Login from "./components/user/login";
import Register from "./components/user/register";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResetPassword from "./components/user/resetPassword";
import MemberDashBoard from "./components/member/memberDashBoard";
import PrivateRoute from "./components/privateRoutes";
import WorkoutSchedule from "./components/member/workoutSchedule";
import { SearchWorkout } from "./components/member/searchWorkout";
import Nutrition from "./components/member/nutrition";
import Unauthorized from "./components/unauthorised";
import GymForm from "./components/owner/gymForm";
import OwnerDashBoard from "./components/owner/ownerDashBoard";
import GymSubscriptionForm from "./components/owner/gymSubscriptionForm";
import CheckIn from "./components/owner/checkIn";
import AnnouncementForm from "./components/owner/announcementForm";
import GymRequests from "./components/admin/adminPanel";
import GymSearch from "./components/member/gymSearch";
import GymDetail from "./components/member/gymDetail";
import Success from "./components/member/success";
import Cancel from "./components/member/cancel";
import PlanDetail from "./components/member/planDetail";
import Members from "./components/owner/members";
import Attendance from "./components/member/attendance";
import { ToastContainer } from "react-toastify";

function App() {
  return (

    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>

        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:userId" element={<ResetPassword />} />

        <Route path="/memberDashBoard" element={<PrivateRoute permittedRoles={["Member"]}>

          <MemberDashBoard />
        </PrivateRoute>} />
        <Route path="/workoutSchedule" element={<PrivateRoute permittedRoles={["Member"]}>

          <WorkoutSchedule />
        </PrivateRoute>} />
        <Route path="/exercise" element={<PrivateRoute permittedRoles={["Member"]}>

          <SearchWorkout />
        </PrivateRoute>} />
        <Route path="/nutrition" element={<PrivateRoute permittedRoles={["Member"]}>

          <Nutrition />
        </PrivateRoute>} />
        <Route path="/gymSearch" element={<PrivateRoute permittedRoles={["Member"]}>

          <GymSearch/>
        </PrivateRoute>} />
        <Route path="/gymDetail" element={<PrivateRoute permittedRoles={["Member"]}>

          <GymDetail/>
        </PrivateRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/addGym" element={<PrivateRoute permittedRoles={["Owner"]}>
          <GymForm />
        </PrivateRoute>} />
        <Route path="/ownerDashBoard" element={<PrivateRoute permittedRoles={["Owner"]}>
          <OwnerDashBoard />
        </PrivateRoute>} />
        <Route path="/addSubscription" element={<PrivateRoute permittedRoles={["Owner"]}>
          <GymSubscriptionForm />
        </PrivateRoute>} />
        <Route path="/checkIn" element={<PrivateRoute permittedRoles={["Owner"]}>
          <CheckIn />
        </PrivateRoute>} />
        <Route path="/announcement" element={<PrivateRoute permittedRoles={["Owner"]}>
          <AnnouncementForm />
        </PrivateRoute>} />
        <Route path="/adminPanel" element={<PrivateRoute permittedRoles={["Admin"]}><GymRequests /></PrivateRoute>
        } />
        <Route path="/success" element={<PrivateRoute permittedRoles={["Member"]}><Success /></PrivateRoute>
        } />
         <Route path="/cancel" element={<PrivateRoute permittedRoles={["Member"]}><Cancel /></PrivateRoute>
        } />
         <Route path="/PlanDetail" element={<PrivateRoute permittedRoles={["Member"]}><PlanDetail /></PrivateRoute>
        } />
        <Route path="/attendace" element={<PrivateRoute permittedRoles={["Member"]}><Attendance/></PrivateRoute>
        } />
        <Route path="/members" element={<PrivateRoute permittedRoles={["Owner"]}><Members /></PrivateRoute>
        } />
      </Routes>


    </BrowserRouter>
    </>

  );
}

export default App;
