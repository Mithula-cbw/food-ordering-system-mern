import React from "react";
import { GiHotMeal } from "react-icons/gi";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import NavDropdownButton from "./NavDropdownButton";

const combosContent = (
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

const NavCombosBtn: React.FC = () => {
  return (
    <NavDropdownButton
      name="Combos"
      icon={<GiHotMeal size={19} />}
      link="/combos"
      content={combosContent}
    />
  );
};

export default NavCombosBtn;
