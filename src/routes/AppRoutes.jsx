import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Games from "../pages/Games";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import StoryBook from "../pages/BookDetail";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<StoryBook />} />
      <Route path="/games" element={<Games />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
