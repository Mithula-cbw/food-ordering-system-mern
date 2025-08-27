import React from "react";
import logo2 from "../../assets/images/thumbnail.png";

const UserAvatar = (props) => {
  return (
    <div>
      <div className={`userImg ${props.lg === true && "lg"}`}>
        <span className="rounded-circle">
          <img
            src={props.img}
            alt=""
            style={{ height: "37px", width: "37px" }}
          />
        </span>
      </div>
    </div>
  );
};

export default UserAvatar;
