import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ options, avatarSrc }) => {
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
    <div className={`relative inline-block text-left`} ref={dropdownRef}>
      {/* Avatar button without borders */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center p-0 rounded-full focus:outline-none cursor-pointer"
      >
        <img src={avatarSrc} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-50"
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
