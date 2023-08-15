// SidebarItem.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarItem({ to, icon, text }) {
  return (
    <li>
      <Link to={to}>
        <FontAwesomeIcon icon={icon} />
        {text}
      </Link>
    </li>
  );
}

export default SidebarItem;
