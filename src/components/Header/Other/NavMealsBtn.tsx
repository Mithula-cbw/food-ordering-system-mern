import React from "react";
import { IoFastFood } from "react-icons/io5";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import NavDropdownButton from "./NavDropdownButton";

const mealsContent = (
  <ul className="space-y-2">
    <li>
      <NavigationMenuLink asChild>
        <a href="/item-1a">Subitem 1A</a>
      </NavigationMenuLink>
    </li>
    <li>
      <NavigationMenuLink asChild>
        <a href="/item-1b">Subitem 1B</a>
      </NavigationMenuLink>
    </li>
  </ul>
);

const NavMealsBtn: React.FC = () => {
  return (
    <NavDropdownButton
      name="Meals"
      icon={<IoFastFood size={19} />}
      link="/meals"
      content={mealsContent}
    />
  );
};

export default NavMealsBtn;
