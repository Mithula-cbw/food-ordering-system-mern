import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Button, Menu, MenuItem } from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";

const socket = io("http://localhost:4000"); // Connect to backend

const Box = (props) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // Fetch initial count
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get(props.apiUrl);
        setTotalProducts(response.data.count);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };

    fetchTotalProducts();

    // Listen for real-time updates
    socket.on("productCountUpdate", (count) => {
      setTotalProducts(count);
    });

    return () => {
      socket.off("productCountUpdate");
    };
  }, [props.apiUrl]);

  return (
    <div
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${props.color[0]}, ${props.color[1]})`,
        cursor: "pointer",
      }}
    >
      {props.grow ? (
        <span className="chart">
          <TrendingUpIcon />
        </span>
      ) : (
        <span className="chart">
          <TrendingDownIcon />
        </span>
      )}

      <div
        className="content-container pt-0"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="col1">
          <h4 className="text-white mb-0">{props.title}</h4>
          <span className="text-white">{totalProducts}</span>
        </div>
        <div className="icon-container">
          {props.icon && <span className="icon">{props.icon}</span>}
        </div>
      </div>

      <div
        className="d-flex align-items-center w-100 bottomEle"
        style={{ marginTop: "auto", paddingBottom: "1px" }}
      >
        <h6 className="text-white mb-0 mt-0">Last Month</h6>
        <Button
          className="ml-auto toggleicon"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          style={{ minWidth: "auto", color: "#fff" }}
        >
          <HiDotsVertical />
        </Button>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ "aria-labelledby": "long-button" }}
          PaperProps={{
            style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" },
          }}
        >
          {["Last Day", "Last Week", "Last Month", "Last Year"].map(
            (option) => (
              <MenuItem
                key={option}
                onClick={() => setAnchorEl(null)}
                style={{ fontSize: "16px" }}
              >
                <IoIosTimer style={{ marginRight: "10px" }} /> {option}
              </MenuItem>
            )
          )}
        </Menu>
      </div>
    </div>
  );
};

export default Box;
