import React from "react";
import { RiDrinksFill } from "react-icons/ri";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import NavDropdownButton from "./NavDropdownButton";

const drinksContent = (
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

const NavDrinksBtn: React.FC = () => {
  return (
    <NavDropdownButton
      name="Drinks"
      icon={<RiDrinksFill size={19} />}
      link="/drinks"
      content={drinksContent}
    />
  );
};

export default NavDrinksBtn;
