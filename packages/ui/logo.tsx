import React from 'react';

const Logo = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 300"
    fill="currentColor" // key change
    {...props}
  >
    <text
      x="84.309"
      y="197.747"
      transform="matrix(5.5, 0, 0, 6.5, -350, -1050)"
      style={{
        fontFamily: "'Brush Script MT', cursive",
        fontSize: 40,
        whiteSpace: "pre",
      }}
    >
      MS
    </text>
  </svg>
);

export { Logo };
