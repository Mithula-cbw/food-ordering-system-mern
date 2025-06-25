import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

interface Category {
  label: string;
  href: string;
  subItems?: string[];
}

const dummyCategories: Category[] = [
  { label: "Burgers", href: "/categories/burgers", subItems: ["Cheeseburger", "Vegan Burger", "Vegan Burger", "Vegan Burger", "Vegan Burger", "Vegan Burger"] },
  { label: "Pizzas", href: "/categories/pizzas", subItems: ["Margherita", "Pepperoni"] },
  { label: "Desserts", href: "/categories/desserts" },
  { label: "Drinks", href: "/categories/drinks", subItems: ["Soda", "Juice"] },
  { label: "Combos", href: "/categories/combos" },
];

const AllCategoriesButton: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(dummyCategories);
    }, 1500); // simulate API delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-header-catbtn text-white rounded-full px-6 py-3 font-semibold text-lg flex items-center gap-2 hover:bg-header-catbtnhover transition-colors">
          <Menu className="w-6 h-6" />
          <span>ALL CATEGORIES</span>
          <ChevronDown className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ml-4 w-64 pl-4 rounded-xl text-lg z-30 pt-10">
        {categories
          ? categories.map(({ label, href, subItems }, index) => (
              <React.Fragment key={label}>
                <HoverCard openDelay={50} closeDelay={0}>
                  <HoverCardTrigger asChild>
                    <Link to={href}>
                      <DropdownMenuItem className="text-lg cursor-pointer flex flex-row items-center justify-between gap-2 font-semibold">
                        <span>{label}</span>
                        {subItems && <ChevronRight className="w-6 h-6" />}
                      </DropdownMenuItem>
                    </Link>
                  </HoverCardTrigger>
                  {subItems && (
                    <HoverCardContent side="right" align="start" className="w-56 pl-8 pt-2 pr-2 pb-4 ">
                      <ul className="space-y-2">
                        {subItems.map((sub) => (
                          <li key={sub} className="w-full hover:text-header-catbtnhover py-1 cursor-pointer">
                            <span className="text-lg font-semibold">{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </HoverCardContent>
                  )}
                </HoverCard>
                {index < categories.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))
          : // Loading skeletons
            Array.from({ length: 5 }).map((_, idx) => (
              <React.Fragment key={idx}>
                <DropdownMenuItem className="py-2">
                  <Skeleton className="h-[20px] w-[150px] rounded-full" />
                </DropdownMenuItem>
                {idx < 4 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AllCategoriesButton;
