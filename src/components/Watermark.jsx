import React from 'react';

const Watermark = ({ text = "TALLYAR", opacity = 0.05, angle = -45 }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div 
        className="text-gray-400 font-bold select-none whitespace-nowrap"
        style={{
          fontSize: '120px',
          transform: `rotate(${angle}deg)`,
          opacity: opacity,
          letterSpacing: '0.1em'
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Watermark;
