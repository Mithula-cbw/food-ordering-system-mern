import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserDetailsButton: React.FC = () => {
  const user = {
    name: "Mithula",
    avatarUrl: "",
  };

  // Get the first letter of the name as fallback
  const getAvatarFallback = (name: string) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="min-h-16 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 transition select-none px-6 py-4 rounded-full">
          <Avatar>
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="bg-header-signin/30 font-semibold text-gray-800 text-base">
              {getAvatarFallback(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-gray-700 font-medium">{user.name}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48 px-4 pb-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDetailsButton;
