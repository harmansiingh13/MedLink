import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "@/components/icons";

const Dropdown = ({
  options,
  placeholder = "Select...",
  onSelect,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setSelected(value);
    onSelect?.(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full ${className} flex justify-between items-center bg-white shadow-sm hover:bg-gray-50`}
      >
        <span>{selected || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 w-full mt-1 bg-white border border-zinc-200 rounded-md shadow-lg z-10 max-h-50 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 border-b border-zinc-200 ${
                selected === option ? "bg-indigo-50 font-medium" : ""
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
