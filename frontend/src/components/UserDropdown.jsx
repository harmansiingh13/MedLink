import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ options, avatarSrc, userName, className = '' }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick();
    } else if (option.path) {
      navigate(option.path);
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <img src={avatarSrc} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
        <span className="font-medium">{userName}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-50 border-b border-zinc-100 last:border-0"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
