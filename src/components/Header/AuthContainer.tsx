import React from "react";
import { Button } from "../ui/button";
import UserDetailsButton from "./UserDetailsButton";
import { Link } from "react-router-dom";

const AuthContainer: React.FC = () => {
  const isLoggedIn = false; // Simulated auth state

  return (
    <div className="flex items-center space-x-4">
      {!isLoggedIn ? (
        <Link to="/signin">
          <Button className="bg-header-signin hover:bg-header-strip transition-colors px-8 py-6 rounded-full">
            <span className="text-white font-semibold text-base">Sign In</span>
          </Button>
        </Link>
      ) : (
        <UserDetailsButton />
      )}
    </div>
  );
};

export default AuthContainer;
