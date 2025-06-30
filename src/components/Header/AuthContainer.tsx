import React from "react";
import { Button } from "../ui/button";
import UserDetailsButton from "./UserDetailsButton";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const AuthContainer: React.FC = () => {
  const { isLoggedIn } = useUser();
  console.log("header auth container", isLoggedIn);

  return (
    <div className="flex items-center space-x-4">
      {!isLoggedIn ? (
        <Link to="/sign-in">
          <Button className="bg-header-signin hover:bg-header-strip transition-colors px-8 py-6 rounded-full">
            <span className="text-white font-semibold text-base">Sign In</span>
          </Button>
        </Link>
      ) : (
        <UserDetailsButton variant="full"/>
      )}
    </div>
  );
};

export default AuthContainer;
