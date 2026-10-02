import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    role="img"
    aria-label="Logo de Natalia Domecq"
  >
    <circle cx="32" cy="32" r="32" fill="#1FA7DA" />
    <text
      x="32"
      y="41"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="26"
      fontWeight="700"
      fill="#ffffff"
      letterSpacing="-0.5"
    >
      ND
    </text>
  </svg>
);

export default Logo;
