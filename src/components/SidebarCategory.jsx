// SidebarCategory.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarCategory({ icon, text }) {
  return (
    <li>
      <FontAwesomeIcon icon={icon} />
      {text}
    </li>
  );
}

export default SidebarCategory;
