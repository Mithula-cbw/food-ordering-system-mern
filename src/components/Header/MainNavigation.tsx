import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import NavHomeBtn from "./Other/NavHomeBtn";
import NavMealsBtn from "./Other/NavMealsBtn";
import NavDessertsBtn from "./Other/NavDessertsBtn";
import NavDrinksBtn from "./Other/NavDrinksBtn";
import NavCombosBtn from "./Other/NavCombosBtn";
import NavBlogBtn from "./Other/NavBlogBtn";
import NavContactBtn from "./Other/NavContactBtn";

const MainNavigation: React.FC = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap overflow-x-auto">
      <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-x-3 mx-auto px-4 py-2">
        <NavHomeBtn />
        <NavMealsBtn />
        <NavDessertsBtn />
        <NavDrinksBtn />
        <NavCombosBtn />
        <NavBlogBtn />
        <NavContactBtn />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default MainNavigation;
