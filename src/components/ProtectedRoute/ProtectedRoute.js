import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isLoggedIn, redirectPath }) {
  return (
    <>
      {isLoggedIn ? <Outlet /> : <Navigate to={redirectPath} replace />}
    </>
  );
};
