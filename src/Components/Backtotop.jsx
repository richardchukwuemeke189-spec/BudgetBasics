import React, { useEffect, useState } from "react";
import "./tokens.css";
import "./BackToTop.css";
import { IconArrowUp } from "./Icons.jsx";

export default function BackToTop({ showAfter = 320 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > showAfter);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <IconArrowUp width={20} height={20} />
    </button>
  );
}