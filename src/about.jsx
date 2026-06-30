import React, { useState, useEffect } from "react";

// Assuming C, Reveal, Glass, FACTS, INTERESTS, and PROFILE_IMG are available in your component scope
export default function AboutSection({ C, Reveal, Glass, FACTS, INTERESTS, PROFILE_IMG }) {
  const [isMobile, setIsMobile] = useState(false);
  // Track window size to shift layouts dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="about" style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 24px" : "110px 24px", maxWidth: 1080, margin: "0 auto" }}>
      <Reveal>
        <p style={{ color: C, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>About</p>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, marginBottom: 48, color: "#F8FAFC" }}>The person behind the code.</h2>
      </Reveal>

      {/* Main Layout Wrapper */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        
        {/* ROW 1: Photo and Summary */}
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile ? "1fr" : "minmax(220px, 280px) 1fr", 
            gap: 32, 
            alignItems: "start" 
          }}
        >
          {/* Photo */}
          <Reveal delay={60}>
            <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: `1px solid ${C}30`, boxShadow: `0 0 36px ${C}14`, maxWidth: isMobile ? "320px" : "none", margin: isMobile ? "0 auto" : "0" }}>
              <img src={PROFILE_IMG} alt="Vishal Patel" style={{ width: "100%", display: "block", filter: "saturate(1.02) contrast(1.03)" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, rgba(5,8,16,0.55) 100%)`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: 14, bottom: 12, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, color: "#F8FAFC", letterSpacing: "0.04em" }}>
                Vishal Patel
              </div>
            </div>
          </Reveal>

          {/* Summary & Interests */}
          <Reveal delay={100}>
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "#64748B", marginBottom: 20 }}>
                I'm a backend engineer who grew up taking electronics apart to understand how things work. That habit never left, I just moved to distributed systems.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "#64748B", marginBottom: 32 }}>
                I care about building things that are <span style={{ color: "#CBD5E1", fontWeight: 500 }}>fast, reliable, and actually matter.</span> Not just code that runs systems that hold under pressure.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {INTERESTS.map(({ icon, label }) => (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)", borderRadius: 20, padding: "7px 16px", fontSize: 13, color: "#A78BFA", fontWeight: 500 }}>
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ROW 2: Facts Grid (Institute, Location, etc.) */}
        <Reveal delay={200}>
          <Glass style={{ padding: 28 }}>
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : `repeat(${FACTS.length}, 1fr)`, 
                gap: 24 
              }}
            >
              {FACTS.map(({ icon, label, val }, index) => (
                <div 
                  key={label} 
                  style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    textAlign: "center", 
                    paddingBottom: isMobile ? 12 : 0,
                    // Subtle divider for desktop vs mobile grids
                    borderBottom: isMobile && index < FACTS.length - 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    borderRight: !isMobile && index !== FACTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    paddingRight: !isMobile && index !== FACTS.length - 1 ? 24 : 0
                  }}
                >
                  <span style={{ fontSize: 22, marginBottom: 6 }}>{icon}</span>
                  <div style={{ fontSize: 10, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4, fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "#CBD5E1", fontWeight: 500 }}>{val}</div>
                </div>
              ))}
            </div>
          </Glass>
        </Reveal>

      </div>
    </section>
  );
}