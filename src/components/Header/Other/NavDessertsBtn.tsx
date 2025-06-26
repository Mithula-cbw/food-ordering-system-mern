import React from "react";
import { LuDessert } from "react-icons/lu";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import NavDropdownButton from "./NavDropdownButton";

const dessertsContent = (
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

const NavDessertsBtn: React.FC = () => {
  return (
    <NavDropdownButton
      name="Desserts"
      icon={<LuDessert size={19} />}
      link="/desserts"
      content={dessertsContent}
    />
  );
};

export default NavDessertsBtn;
