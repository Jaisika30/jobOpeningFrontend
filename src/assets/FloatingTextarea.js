import React, { useState } from "react";

export function FloatingTextarea({ descriptionRef, value, onChange, onEnter, placeholder }) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0; // Determines when the label moves up

  return (
    <div style={{ position: "relative", width: "100%", marginTop: "1.5rem" }}>
      <label
        htmlFor="description"
        style={{
          position: "absolute",
          top: isFloating ? "-8px" : "12px", // Moves label when floating
          left: "12px",
          fontSize: isFloating ? "0.75rem" : "0.85rem",
          fontWeight: 400,
          color: isFloating ? "#c124ae" : "#464443", // Changes label color when floating
          transition: "all 0.2s ease-in-out",
          pointerEvents: "none",
        }}
      >
        Description
      </label>

      <textarea
        id="description"
        name="description"
        ref={descriptionRef}
        value={value}
        onChange={(e) => {
          onChange(e);
          setFocused(true); // Ensure the floating state triggers
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          if (value.length === 0) setFocused(false); // Only reset focus if field is empty
        }}
        placeholder={isFloating ? placeholder : ""} // Shows placeholder ONLY when label floats
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onEnter?.();
          }
        }}
        style={{
          width: "100%",
          minHeight:"100px",
          fontSize: "0.85rem",
          padding: "16px 12px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          color: "#464443",
        }}
      />
    </div>
  );
}
