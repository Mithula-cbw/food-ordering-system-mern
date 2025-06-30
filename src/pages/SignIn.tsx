import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Auth from "../components/Auth/Auth";
import PasswordInput from "../components/Auth/PassWordField";
import EmailField from "../components/Auth/EmailField";
import GoogleSignInButton from "../components/Auth/GoogleSignInButton";
import AuthActionButton from "../components/Auth/AuthActionButton";
import { Link } from "react-router-dom";
import AuthDivider from "../components/Auth/AuthDivider";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // Refs for scroll targets
  const emailFormRef = useRef<HTMLDivElement>(null);
  const googleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log("✉️ Email:", email);
    console.log("🔐 Password:", password);
  }, [email, password]);

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Add your forgot password logic here
    alert("Forgot password functionality would be implemented here");
  };

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

  const handleEmailFieldClick = () => {
    // Scroll to position the Google button at the top and email form in center
    if (emailFormRef.current && googleButtonRef.current) {
      const googleButtonRect = googleButtonRef.current.getBoundingClientRect();

      // Calculate the scroll position to center the email form

      // Position Google button near the top with some padding
      const targetScrollY = window.scrollY + googleButtonRect.top - 80;

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <Auth title="Sign In" classname={"w-[90%] md:w-[60%] lg:w-[30%] "}>
      <div className="space-y-4 ">
        {/* Google Sign In */}
        <GoogleSignInButton
          onClick={() => console.log("Google sign in clicked")}
          buttonRef={googleButtonRef}
        />

        {/* Divider */}
        <AuthDivider text="Or sign in with email" />

        {/* Email/Password Form Section */}
        <div ref={emailFormRef} className="space-y-4">
          <div onClick={handleEmailFieldClick}>
            <EmailField value={email} setEmail={setEmail} />
          </div>

          <PasswordInput
            title="Password"
            password={password}
            setPassword={setPassword}
            isPasswordVisible={isPasswordVisible}
            handleToggleVisibility={() => setIsPasswordVisible((prev) => !prev)}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200 focus:outline-none focus:underline"
            >
              Forget Password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-2 space-x-3 pt-4">
            <AuthActionButton
              text="Sign In"
              loadingText="Signing in..."
              loading={loading}
              disabled={!email || !password}
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
              Not Registered?{" "}
              <Link to={"/sign-up"}>
                <button
                  type="button"
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                >
                  Sign Up
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default SignIn;
