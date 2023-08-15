// SidebarItem.jsx

import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ to, text }) {
  return (
    <li>
      <Link to={to}>{text}</Link>
    </li>
  );
}

export default SidebarItem;
