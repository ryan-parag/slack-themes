import React from 'react';

const Logo = () => {
  return (
    <div className="inline-flex items-center">
      <div className="w-12 h-12 rounded-md overflow-hidden shadow-lg transform -rotate-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 80" fill="none">
          <g clipPath="url(#clip0)">
            <rect x="0.407715" y="0.407715" width="79.5923" height="79.5923" fill="#050506"/>
            <rect x="40.6287" y="-40.0923" width="28.2388" height="114.157" transform="rotate(45 40.6287 -40.0923)" fill="#CE3A5E"/>
            <rect x="60.5965" y="-20.1245" width="28.2388" height="114.157" transform="rotate(45 60.5965 -20.1245)" fill="#63C4EE"/>
            <rect x="80.5644" y="-0.156631" width="28.2388" height="114.157" transform="rotate(45 80.5644 -0.156631)" fill="#5CB381"/>
            <rect x="100.532" y="19.8112" width="28.2388" height="114.157" transform="rotate(45 100.532 19.8112)" fill="#E4B34B"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="100%" height="100%" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="ml-4">
        <div className="font-extrabold text-xl">Slack Themes</div>
        <div className="text-sm text-gray-500">Version 2</div>
      </div>
    </div>
  )
};

export default Logo;