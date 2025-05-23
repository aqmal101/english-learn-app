import { useState, useEffect } from "react";
import {
  Menu,
  Home,
  User,
  LayoutDashboard,
  LogOut,
  X,
  Link,
} from "lucide-react";
import GlowingButton from "./CandyButton";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Alert from "./Alert";
import api from "../lib/api";

const MenuItem = ({ icon, label, onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer hover:bg-amber-100 transition ${className}`}
  >
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-black">
      {icon}
    </div>
    <span className="text-purple-800 font-semibold">{label}</span>
  </div>
);

const Settings = ({ className }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [role, setRole] = useState(null);
  console.log(role);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [alertMessage, setAlertMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [alertType, setAlertType] = useState("success");
  // eslint-disable-next-line no-unused-vars
  const [alertKey, setAlertKey] = useState(0);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertKey(Date.now());
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setRole(userData?.role);
  }, []);

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/v1/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
      showAlert("Logout sucessfuly", "success");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      showAlert("Logout failed. Please try again.", "error");
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 ${className}`}
    >
      <Alert message={alertMessage} duration={3000} />
      <AnimatePresence>
        {showMenu && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-64 bg-white rounded-2xl shadow-xl pt-4 pb-16 mt-20 mb-12 mr-12 px-3 flex flex-col gap-2"
          >
            <MenuItem
              icon={<Home size={18} />}
              label="Home"
              onClick={() => {
                navigate("/home");
                setShowMenu(false);
              }}
            />

            <MenuItem
              icon={<User size={18} />}
              label="Profile"
              onClick={() => {
                navigate("/profile");
                setShowMenu(false);
              }}
            />

            {role === "teacher" && (
              <a href={baseURL} target="_blank" rel="noopener noreferrer">
                <MenuItem
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                />
              </a>
            )}

            <MenuItem
              icon={<LogOut size={18} />}
              label="Logout"
              onClick={() => {
                handleLogout();
                setShowMenu(false); // optional, krn akan redirect
              }}
              className="bg-red-100 text-red-600"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <GlowingButton
        color="amber"
        icon={
          showMenu ? (
            <X className="text-black w-6 h-6" />
          ) : (
            <Menu className="text-black w-6 h-6" />
          )
        }
        onClick={() => setShowMenu((prev) => !prev)}
      />
    </div>
  );
};

export default Settings;
