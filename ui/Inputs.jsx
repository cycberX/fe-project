"use client"
import React, { useState } from "react";
export function Input({
  type,
  icon,
  value,
  name,
  onChange,
  required,
  placeholder,
  accept,
  style,
  className,
}) {
  const inputStyle = {
    padding: "8px 12px",
    fontSize: "16px",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div className="input">
      {icon}
      {name}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        accept={accept}
        style={inputStyle}
        className={className}
      />
    </div>
  );
}

export function FloatableInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
}) {
  const [focused, setFocused] = useState(false);

  // Handle focus and blur events
  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    if (value === "") {
      setFocused(false);
    }
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        {/* Icon */}
        {icon}

        {/* Input Field */}
        <input
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder} // to make the placeholder hidden but allow label movement
        />
      </div>

      <style jsx>{`
        .input-container {
          position: relative;
          margin-bottom: 20px;
          width: 100%;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          font-size: 18px;
          color: #888;
          transition: color 0.2s ease;
        }

        .styled-input {
          width: 100%;
          padding: 12px 15px;
          padding-left: 35px; /* Adjust space for the icon */
          font-size: 16px;
          border: 2px solid #ccc;
          border-radius: 4px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .styled-input:focus {
          border-color: #4caf50; /* Change border color on focus */
        }

        .styled-label {
          position: absolute;
          left: 15px;
          top: 12px;
          font-size: 16px;
          color: #888;
          transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
        }

        .styled-input:focus + .styled-label,
        .styled-input:not(:placeholder-shown) + .styled-label {
          top: -8px;
          font-size: 12px;
          color: #4caf50; /* Label turns green when input is focused or has value */
        }
      `}</style>
    </div>
  );
}
