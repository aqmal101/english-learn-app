// routes/AppRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Games from "../pages/Games";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import StoryBook from "../pages/BookDetail";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "home", element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "books/:id", element: <StoryBook /> },
      { path: "games", element: <Games /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "login", element: <LoginPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
