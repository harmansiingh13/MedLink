import { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  options = [],
  placeholder = 'Select...',
  value,
  onSelect,
  className = '',
  menuExtra = 0,
}) => {
  const [open, setOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState('auto');
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const handleSelect = (val) => {
    onSelect?.(val);
    setOpen(false);
  };

  const measure = () => {
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setMenuWidth(Math.ceil(rect.width + menuExtra) + 'px');
    } else {
      setMenuWidth('auto');
    }
  };

  useEffect(() => {
    if (open) {
      measure();
    }
    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    const btn = buttonRef.current;
    if (btn && typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver(() => measure());
      resizeObserverRef.current.observe(btn);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeObserverRef.current && btn) {
        resizeObserverRef.current.unobserve(btn);
        resizeObserverRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, menuExtra]);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          measure();
          setOpen((prev) => !prev);
        }}
        className={`flex items-center  ${className}`}
      >
        <span className="truncate">{value || placeholder}</span>
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
        <div
          className="absolute left-0 mt-1 bg-white border border-zinc-200 rounded-md shadow-md z-10 overflow-hidden"
          style={{ width: menuWidth, boxSizing: 'border-box' }}
        >
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-indigo-50 ${
                value === option ? 'bg-indigo-50 font-medium' : ''
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
