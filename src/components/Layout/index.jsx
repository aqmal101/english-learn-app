import Settings from "../Setting";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isNotFoundPage = location.pathname === "*";
  const isStoryPage = location.pathname.includes("/books/");  

  const isExcludedPage = isLandingPage || isLoginPage || isNotFoundPage || isStoryPage;

  return (
    <div className="w-screen h-screen">
      {children}
      <Settings className={`${isExcludedPage ? "hidden" : ""}`} />
    </div>
  );
};

export default Layout;
