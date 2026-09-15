import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth,
  );

  console.log("AUTH STATE:", {
    user,
    isAuthenticated,
    loading,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;