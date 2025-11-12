import React from "react";
import darkLogo from "../assets/technirman-logo-dark.svg";
import lightLogo from "../assets/technirman-logo-light.svg";

interface LogoProps {
  height?: number | string;
  className?: string;
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ height = 56, className = "", variant = 'dark' }) => {
  const src = variant === 'light' ? lightLogo : darkLogo;
  return (
    <img
      src={src}
  alt="Technirman Infrastructure - The skyline of Trust"
      style={{ height, width: "auto", display: "block", objectFit: 'contain' }}
      className={className}
      draggable={false}
      loading="eager"
    />
  );
};
export default Logo;
