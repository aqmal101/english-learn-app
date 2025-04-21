import { useEffect, useState } from "react";
import { Info, CheckCircle, XCircle } from "lucide-react";

const Alert = ({ type = "success", message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message) return null;

  const config = {
    success: {
      color: "green",
      icon: <CheckCircle fill="green" className="text-green-500" size={20} />,
    },
    error: {
      color: "red",
      icon: <XCircle fill="red" stroke="white" size={40} />,
    },
    info: { color: "blue", icon: <Info className="text-blue-500" size={20} /> },
  };

  const { icon } = config[type] || config.success;

  return (
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-fit max-w-md px-4 py-3 rounded shadow-lg border
        bg-white text-sm flex items-center gap-3
        transition-all duration-500 ease-in-out
        ${
          visible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }
        border-${config[type]?.color}-300
      `}
    >
      <div className="rounded-full p-1 bg-white">{icon}</div>
      <span className={`text-${config[type]?.color}-700 font-medium`}>
        {message}
      </span>
    </div>
  );
};

export default Alert;
