import { ClimbingBoxLoader } from "react-spinners";

const LoadingSpinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <ClimbingBoxLoader color="#a7cc56" />
    </div>
  );
};

export default LoadingSpinner;
