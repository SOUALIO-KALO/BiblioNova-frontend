import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-30 w-30 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
