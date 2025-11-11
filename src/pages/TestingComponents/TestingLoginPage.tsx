import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const TestingLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // last page accessed by the user
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = () => {
    login(() => {
      // go back to the page the user came from or to dashboard
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <button
        onClick={handleLogin}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        simulate login
      </button>
    </div>
  );
};
