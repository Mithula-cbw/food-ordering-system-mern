import React from "react";
import { RiDrinksFill } from "react-icons/ri";
import { 
NavigationMenu, 
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NavButton from "./NavButton";


const NavDrinksBtn: React.FC = () => {
  return (
    <NavigationMenu className="flex-1">
      <NavigationMenuList className="flex w-full flex-row justify-between items-center gap-6">

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <NavButton name={"Drinks"} icon={<RiDrinksFill size={19}/>} link={""} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-4 w-64 space-y-2">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
        </NavigationMenuList>
      <NavigationMenuViewport className="bg-white shadow-lg p-6 rounded-xl mt-2" />
    </NavigationMenu>
  );
};

export default NavDrinksBtn;
