import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import CanteenPage from "../pages/CanteenPage";
import PrintingPage from "../pages/PrintingPage";
import ProfilePage from "../pages/ProfilePage";
import MenuPage from "../pages/MenuPage";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import PrintForm from "../pages/PrintForm";
import BookTable from "../pages/BookTable";
import EditProfilePage from "../pages/EditProfilePage";
import CanteenOwnerPage from "../pages/canteenPages/CanteenOwnerPage";
import CanteenLogin from "../pages/canteenPages/CanteenLogin";
import PrintLogin from "../pages/printPages/PrintLogin";
import PrintDashboard from "../pages/printPages/PrintDashboard";
import Index from "../Index";
const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/index" element={<Index/>} />
      <Route path="/canteen-login" element={<CanteenLogin />} />
      <Route path="/print-login" element={<PrintLogin />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<LandingPage />} />
        <Route path="canteen" element={<CanteenPage />} />
        <Route path="printing" element={<PrintingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="menu/:phone" element={<MenuPage/>} />
        <Route path="book/:phone" element={<BookTable/>} />
        <Route path="print/:phone" element={<PrintForm/>} />
        <Route path="canteen-owner" element={<CanteenOwnerPage/>} />
        <Route path="print-owner" element={<PrintDashboard/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;