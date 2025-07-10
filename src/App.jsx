import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Admin from "./Admin/admin";
import AdminLayout from "./layouts/AdminLayout";
import Inquiries from "./Admin/Inquiries";
import Posts from "./Admin/Posts";
import Report from "./pages/Report";
import ScrollToTop from "./ScrollToTop";
import InquiryView from "./Admin/InquiryView";
import Login from "./pages/login";
import Logout from "./Admin/Logout";
import Dashboard from "./pages/Dashboard";
import Reports from "./Admin/Reports";
import ViewReport from "./Admin/ViewReport";
import Register from "./pages/register";

export default function App() {
  
  function AdminRoute({ children }) {
    const role = localStorage.getItem("role");
    return role === "investigator" ? children : <Navigate to="/login" replace />;
  }

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });

    AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Blog />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Admin />} />
              <Route path="inquiries" element={<Inquiries />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:id" element={<ViewReport />} />
              <Route path="posts" element={<Posts />} />
              <Route path="inquiries/:id" element={<InquiryView />} />
            </Route>
            
            
            <Route path="/report" element={<Report />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/logout" element={<Logout />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
