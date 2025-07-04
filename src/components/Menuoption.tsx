import React, { useState } from "react";
import "./menuStyle.css";

type MenuOptionProps = {
  label: string;
  icon: string;
  hoverIcon: string;
  onClick?: () => void;
};

export const Menuoption: React.FC<MenuOptionProps> = ({
  label,
  icon,
  hoverIcon,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="menu-option"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? hoverIcon : icon}
        alt={label}
        className="menu-option-icon"
      />
      <span className="menu-option-label">{label}</span>
    </div>
  );
};
