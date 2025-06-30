import * as React from "react";
import { useEffect, useState } from "react";
import Auth from "../components/Auth/Auth";
import PasswordInput from "../components/Auth/PassWordField";
import EmailField from "../components/Auth/EmailField";
import AuthActionButton from "../components/Auth/AuthActionButton";
import { Link } from "react-router-dom";
import NameField from "../components/Auth/NameField";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log("✉️ Email:", email);
    console.log("🔐 Password:", password);
  }, [email, password]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // fake sign-in logic
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@test.com" && password === "password") {
        setError(null);
        console.log("Sign in successful!");
        // Add your success logic here (e.g., redirect, set auth state)
      } else {
        setError("Invalid credentials");
      }
    }, 1000);
  };

  return (
    <Auth title="Sign Up" classname={"w-[90%] md:w-[60%] lg:w-[40%]"}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-6 md:gap-x-4">
          <NameField value={name} setName={setName} />
          <EmailField value={email} setEmail={setEmail} />
        </div>

        <PasswordInput
          title="Password"
          password={password}
          setPassword={setPassword}
          isPasswordVisible={isPasswordVisible}
          handleToggleVisibility={() => setIsPasswordVisible((prev) => !prev)}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-2 space-x-3 pt-4">
          <AuthActionButton
            text="Sign Up"
            loadingText="Signing Up..."
            loading={loading}
            disabled={!email || !password || !name}
            onClick={handleSignIn}
          />

          <Link to={"/"}>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
            >
              Cancel
            </button>
          </Link>
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-4">
          <span className="text-gray-600 text-sm">
            Already Registered?{" "}
            <Link to={"/sign-in"}>
              <button
                type="button"
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                onClick={() => console.log("Navigate to sign up")}
              >
                Sign In
              </button>
            </Link>
          </span>
        </div>
      </div>
    </Auth>
  );
};

export default SignUp;
