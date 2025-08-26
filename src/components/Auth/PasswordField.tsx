import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
  isPasswordVisible: boolean;
  handleToggleVisibility: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  title = "Password",
  isPasswordVisible,
  handleToggleVisibility,
}) => {
  return (
    <TextField
      label={title}
      variant="standard"
      type={isPasswordVisible ? "text" : "password"}
      required
      className="w-100"
      name="password"
      value={password}
      autoComplete="new-password"
      onChange={(e) => setPassword(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggleVisibility} edge="end">
              {isPasswordVisible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
