import { useNavigate } from "react-router-dom";
import TextButton from "../components/TextButton";
import { useState } from "react";

const LoginStudentForm = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <h2 className="text-xl font-semibold">Student Login</h2>
      <input
        type="text"
        placeholder="Student ID"
        className="px-4 py-2 border rounded w-64"
      />
      <input
        type="password"
        placeholder="Password"
        className="px-4 py-2 border rounded w-64"
      />
    </div>
  );
};

const LoginTeacherForm = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 mt-6">
      <h2 className="text-xl font-semibold">Teacher Login</h2>
      <input
        type="text"
        placeholder="Email"
        className="px-4 py-2 border rounded w-64"
      />
      <input
        type="password"
        placeholder="Password"
        className="px-4 py-2 border rounded w-64"
      />
    </div>
  );
};

const LoginPage = () => {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRouteLogin = () => {
    // Kamu bisa tambahkan autentikasi real di sini nanti
    setTimeout(() => {
      navigate(`/home`);
    }, 1000);
  };

  return (
    <div className="h-screen relative max-h-screen flex flex-col justify-center items-center bg-[url('/img/background/Landscape.png')] box-border overflow-hidden">
      <div className="absolute top-20 left-1/4 right-1/4 bottom-20 z-10 flex flex-col justify-center items-center rounded-2xl bg-white/90 p-10 gap-6">
        <h1 className="text-4xl font-bold">Login Page</h1>

        {role === "student" ? <LoginStudentForm /> : <LoginTeacherForm />}

        <TextButton
          className="w-1/2"
          onClick={handleRouteLogin}
          color="pink"
          size="md"
        >
          <div className="text-2xl font-bold">Login</div>
        </TextButton>
        <div className="flex gap-4">
          <TextButton
            onClick={() => setRole(role === "student" ? "teacher" : "student")}
            color="yellow"
            size="sm"
          >
            Login as {role === "student" ? "Teacher" : "Student"}
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
