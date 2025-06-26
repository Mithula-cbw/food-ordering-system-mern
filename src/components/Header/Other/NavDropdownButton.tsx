import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NavButton from "./NavButton";

interface NavDropdownButtonProps {
  name: string;
  icon?: React.ReactNode;
  link?: string;
  content: React.ReactNode;
}

const NavDropdownButton: React.FC<NavDropdownButtonProps> = ({
  name,
  icon,
  link = "#",
  content,
}) => {
  return (
    <NavigationMenu className="flex-1">
      <NavigationMenuList className="flex w-full flex-row justify-between items-center gap-6">
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <NavButton name={name} icon={icon} link={link} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-64">{content}</div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport className="bg-white shadow-lg p-6 rounded-xl mt-2" />
    </NavigationMenu>
  );
};

export default NavDropdownButton;
