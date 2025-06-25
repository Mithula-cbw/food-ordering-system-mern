import { Button } from "@mui/material";
import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBox = () => {
  return (
    <div className="headerSearch ml-5">
      <input type="text" placeholder="search for products" />
      <Button>
        <IoIosSearch />
      </Button>
    </div>
  );
};

export default SearchBox;
