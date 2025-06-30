import React from "react";
import LoadingButtonContent from "./LoadingButtonContent";

interface AuthActionButtonProps {
  text: string;                 // Normal button label
  loadingText?: string;        // Label shown when loading (default = "Loading...")
  onClick: (e: React.FormEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
}

const AuthActionButton: React.FC<AuthActionButtonProps> = ({
  text,
  loadingText = "Loading...",
  onClick,
  loading = false,
  disabled = false,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="flex-1 bg-auth-button hover:bg-auth-buttonhover disabled:bg-gray-200 disabled:cursor-default text-black font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
    >
      {loading ? <LoadingButtonContent text={loadingText} /> : text}
    </button>
  );
};

export default AuthActionButton;
