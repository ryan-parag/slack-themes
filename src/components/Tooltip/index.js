import React from 'react'

const Tooltip = ({ children, tooltipText }) => {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
      tipRef.current.style.opacity = 1;
  }
  function handleMouseLeave() {
      tipRef.current.style.opacity = 0;
  }
  return (
      <div
          className="relative flex items-center z-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
          <div
              className="shadow-xl text-sm w-28 border border-white border-opacity-10 absolute whitespace-no-wrap bg-white dark:bg-zinc-800 px-4 py-2 rounded flex items-center text-center justify-center transition-all duration-150 -bottom-12 left-1/2 -translate-x-1/2"
              style={{ opacity: 0 }}
              ref={tipRef}
          >
              {tooltipText}
          </div>
          {children}
      </div>
  );
}

export default Tooltip