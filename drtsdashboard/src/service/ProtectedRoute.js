export const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute rendering");
  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return children;
};
