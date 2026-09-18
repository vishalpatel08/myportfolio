import { useState, useEffect } from "react";

// Assuming C, navScrolled, and scrollTo are passed as props or defined above
export default function Navbar({ C, scrollTo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track window size to determine if we should show mobile layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false); // Close menu if scaling up to desktop
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = ["about", "skills", "projects", "experience", "contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isMobile ? "0 24px" : "0 64px", // Reduced padding on mobile
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(30,41,59,0.96)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #475569",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: "#F1F5F9", fontSize: 20, letterSpacing: "0.04em" }}>
        VP
      </span>

      {/* Desktop Links / Mobile Dropdown */}
      <div
        style={
          isMobile
            ? {
                position: "absolute",
                top: 60,
                left: 0,
                right: 0,
                background: "#1E293B",
                backdropFilter: "blur(20px)",
                display: isMenuOpen ? "flex" : "none",
                flexDirection: "column",
                gap: 0,
                padding: "16px 0",
                borderBottom: "1px solid #475569",
              }
            : {
                display: "flex",
                gap: 28,
              }
        }
      >
        {navLinks.map((s) => (
          <button
            key={s}
            onClick={() => {
              scrollTo(s);
              setIsMenuOpen(false); // Close menu after clicking a link
            }}
            style={{
              background: "none",
              border: "none",
              color: "#CBD5E1",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Inter',sans-serif",
              textTransform: "capitalize",
              letterSpacing: "0.06em",
              transition: "all 0.2s",
              // Mobile specific item styling
              padding: isMobile ? "16px 24px" : "0",
              textAlign: isMobile ? "left" : "center",
              width: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => (e.target.style.color = C)}
            onMouseLeave={(e) => (e.target.style.color = "#CBD5E1")}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 5,
            width: 24,
            height: 24,
            padding: 0,
          }}
        >
          <span style={{ width: "100%", height: 2, background: "#CBD5E1", transition: "0.3s", transform: isMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "100%", height: 2, background: "#CBD5E1", transition: "0.3s", opacity: isMenuOpen ? 0 : 1 }} />
          <span style={{ width: "100%", height: 2, background: "#CBD5E1", transition: "0.3s", transform: isMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      )}
    </nav>
  );
}