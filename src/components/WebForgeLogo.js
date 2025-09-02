import React from 'react';

const WebForgeLogo = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160 40 L140 60 L120 40 L100 60 L80 40"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="50%"
        y="75%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        WEB FORGE
      </text>
    </svg>
  );
};

export default WebForgeLogo;
