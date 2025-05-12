import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectionProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Selection({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}: SelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const selectedOption = options.find((opt) => opt.value === internalValue);

  const handleSelect = (option: Option) => {
    if (option.disabled) return;
    setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-2 text-left border rounded-md transition-all ${
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-70"
            : "bg-white hover:border-gray-400 cursor-pointer"
        } ${
          isOpen ? "border-blue-500 ring-1 ring-blue-200" : "border-gray-300"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={`truncate ${!selectedOption ? "text-gray-400" : ""}`}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1 overflow-auto text-base max-h-60">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer transition-colors flex items-center ${
                  option.disabled
                    ? "text-gray-400 cursor-not-allowed bg-gray-50"
                    : "hover:bg-blue-50"
                } ${
                  internalValue === option.value ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                <span className="flex-1 truncate">{option.label}</span>
                {internalValue === option.value && (
                  <Check className="w-4 h-4 ml-2 text-blue-500" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
