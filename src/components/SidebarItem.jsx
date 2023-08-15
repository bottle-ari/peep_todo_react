// SidebarItem.jsx

import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ to, text }) {
  return (
    <li>
<<<<<<< HEAD
      <Link to={to}>{text}</Link>
=======
      <Link to={to}>
        {text}
      </Link>
>>>>>>> feature/optimization
    </li>
  );
}

export default SidebarItem;
