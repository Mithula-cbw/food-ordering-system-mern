import React from "react";
import NavHomeBtn from "./Other/NavHomeBtn";
import NavMealBtn from "./Other/NavMealBtn";

const MainNavigation: React.FC = () => {
  return (
    <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-4 mx-auto px-4 py-2">
      <NavHomeBtn />
      <NavMealBtn />
    </div>
  );
};

export default MainNavigation;
