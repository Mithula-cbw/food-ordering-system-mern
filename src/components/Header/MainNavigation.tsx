import React from "react";
import NavHomeBtn from "./Other/NavHomeBtn";
import NavMealsBtn from "./Other/NavMealsBtn";
import NavDessertsBtn from "./Other/NavDessertsBtn";
import NavDrinksBtn from "./Other/NavDrinksBtn";
import NavCombosBtn from "./Other/NavCombosBtn";
import NavBlogBtn from "./Other/NavBlogBtn";
import NavContactBtn from "./Other/NavContactBtn";

const MainNavigation: React.FC = () => {
  return (
      <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-x-3 mx-auto px-4 py-2">
        <NavHomeBtn />
        <NavMealsBtn />
        <NavDessertsBtn />
        <NavDrinksBtn />
        <NavCombosBtn />
        <NavBlogBtn />
        <NavContactBtn />
      </div>
  );
};

export default MainNavigation;
