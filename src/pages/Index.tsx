
import { Navigate } from "react-router-dom";

const Index = () => {
  // Simply redirect to the dashboard page if somehow the user reaches the index page
  return <Navigate to="/dashboard" replace />;
};

export default Index;
