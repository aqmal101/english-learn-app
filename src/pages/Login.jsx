import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextButton from "../components/TextButton";
import Alert from "../components/Alert";
import { RefreshCcw } from "lucide-react";
import Tooltip from "../components/Tooltip";

const LoginPage = () => {
  const [role, setRole] = useState("student");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertKey, setAlertKey] = useState(0);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertKey(Date.now());
  };

  // console.log(alertMessage);
  // console.log(alertType);

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/auth/login`, {
        username: data.username,
        password: data.password,
      });

      const { token, user } = response.data?.meta?.data || {};
      if (token && user) {
        showAlert(response.data.meta.message, "success");

        localStorage.setItem("authToken", token);
        localStorage.setItem("userInfo", JSON.stringify(user));

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        throw new Error("Token tidak ditemukan");
      }
    } catch (error) {
      const message =
        error.response?.meta?.message ||
        "Login failed. Please check your credentials.";
      showAlert(message, "error");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/img/background/Landscape2.png')] bg-cover bg-center bg-no-repeat bg-cover">
      <div className="w-[90%] max-w-md p-8 bg-white/90 rounded-2xl shadow-md flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-purple-900">Login {role}</h1>
        <Alert
          key={alertKey}
          type={alertType}
          message={alertMessage}
          duration={3000}
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <input
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-full"
            {...register("username", {
              required: "Username/Email is required",
            })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-full"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <TextButton
            type="submit"
            color="blue"
            className="py-3"
            disabled={isSubmitting}
          >
            <div className="text-2xl font-bold">
              {isSubmitting ? "Logging in..." : "Login"}
            </div>
          </TextButton>
        </form>

        <div className="flex items-center gap-2 mt-4">
          <TextButton
            onClick={() => setRole(role === "student" ? "teacher" : "student")}
            color="yellow"
            size="sm"
          >
            Login as {role === "student" ? "Teacher" : "Student"}
          </TextButton>
          <Tooltip text="Switch role" position="right">
            <RefreshCcw className="stroke-amber-800 mt-1.5 cursor-pointer" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
