import { useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light"); // "light" or "dark"

  const isDark = theme === "dark";

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isDark ? "#111827" : "#f9fafb",
    color: isDark ? "#f9fafb" : "#111827",
    transition: "all 0.25s ease",
    padding: "24px",
  };

  const cardStyle = {
    width: "min(520px, 95vw)",
    borderRadius: "16px",
    padding: "24px",
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
    transition: "all 0.25s ease",
  };

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    backgroundColor: isDark ? "#f9fafb" : "#111827",
    color: isDark ? "#111827" : "#f9fafb",
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: isDark ? "#111827" : "#f3f4f6",
    border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginTop: 0 }}>Theme Toggle App</h1>

        <p style={{ lineHeight: 1.6 }}>
          Click the button to switch between Light and Dark mode.
        </p>

        <p>
          Current theme: <span style={badgeStyle}>{theme.toUpperCase()}</span>
        </p>

        <button style={buttonStyle} onClick={toggleTheme}>
          Switch to {isDark ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
}