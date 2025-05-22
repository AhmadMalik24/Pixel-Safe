import React from 'react';

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, animated = false, className = '' }) => {
  // Array of grid cells with their colors and opacities
  const cells = [
    { x: 0, y: 0, opacity: 1 },
    { x: 1, y: 0, opacity: 0.8 },
    { x: 2, y: 0, opacity: 0.6 },
    { x: 0, y: 1, opacity: 0.7 },
    { x: 1, y: 1, opacity: 1, color: '#F97316' }, // Special center cell with accent color
    { x: 2, y: 1, opacity: 0.5 },
    { x: 0, y: 2, opacity: 0.5 },
    { x: 1, y: 2, opacity: 0.6 },
    { x: 2, y: 2, opacity: 0.9 },
  ];
  
  // Cell size is 1/3 of the total logo size
  const cellSize = size / 3;
  // Gap between cells
  const gap = size * 0.05;
  // Adjusted cell size accounting for gap
  const adjustedCellSize = (size - gap * 2) / 3;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {cells.map((cell, index) => {
        // Calculate position with gap
        const x = cell.x * (adjustedCellSize + gap);
        const y = cell.y * (adjustedCellSize + gap);
        
        return (
          <rect
            key={index}
            width={adjustedCellSize}
            height={adjustedCellSize}
            x={x}
            y={y}
            rx={adjustedCellSize * 0.1} // Rounded corners
            fill={cell.color || '#3B82F6'}
            opacity={cell.opacity}
            className={animated ? `animate-pixel-in [animation-delay:${index * 100}ms]` : ''}
          />
        );
      })}
    </svg>
  );
};

export default Logo;