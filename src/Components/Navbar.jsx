import React, { useState, useRef, useEffect } from "react";
import "./tokens.css";
import "./Navbar.css";
import logo from "../assets/basic.png";
import { useVisitorCount } from "./Usevisitorcount.js";

// Navigation items
const NAV_ITEMS = [
  { label: "Home", href: "#home" },

  {
    label: "Learn Budgeting",
    children: [
      { label: "Budgeting Basics", href: "#budgeting-basics" },
      { label: "Needs vs Wants", href: "#needs-vs-wants" },
    ],
  },

  {
    label: "Practice Planning",
    children: [
      { label: "50/30/20 Calculator", href: "#calculator" },
      { label: "Savings Goals", href: "#savings-goals" },
      { label: "Expense Planner", href: "#expense-planner" },
      { label: "Money Mistakes", href: "#money-mistakes" },
    ],
  },

  {
    label: "Resources",
    children: [
      {
        label: "Infographics & Learning Gallery",
        href: "#gallery",
      },
    ],
  },

  {
    label: "Help / Connect",
    children: [
      { label: "AI Q&A Assistant", href: "#help-connect" }
    ],
  },
];


// Smooth scroll
function scrollToAnchor(e, href) {
  e.preventDefault();

  document
    .querySelector(href)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}


// Dropdown item
function DropdownItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // Normal navigation item
  if (!item.children) {
    return (
      <a
        href={item.href}
        className="bb-navbar-link"
        onClick={(e) => {
          scrollToAnchor(e, item.href);

          if (onNavigate) {
            onNavigate();
          }
        }}
      >
        {item.label}
      </a>
    );
  }


  // Dropdown navigation item
  return (
    <div
      className="bb-navbar-dropdown"
      ref={wrapperRef}
    >

      <button
        type="button"
        className={`bb-navbar-link bb-navbar-dropdown-trigger ${
          open ? "is-open" : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >

        {item.label}

        <span
          className="bb-navbar-caret"
          aria-hidden="true"
        >
          {open ? "−" : "+"}
        </span>

      </button>


      {open && (
        <div className="bb-navbar-dropdown-menu">

          {item.children.map((child) => (

            <a
              key={child.href}
              href={child.href}
              className="bb-navbar-dropdown-link"
              onClick={(e) => {
                scrollToAnchor(e, child.href);

                setOpen(false);

                if (onNavigate) {
                  onNavigate();
                }
              }}
            >
              {child.label}
            </a>

          ))}

        </div>
      )}

    </div>
  );
}


// Navbar status
function NavbarStatus() {
  const visitorCount = useVisitorCount();

  const [now, setNow] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(
      () => setNow(new Date()),
      60000
    );

    return () => clearInterval(timer);
  }, []);


  const date = now.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );


  const time = now.toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );


  return (
    <div className="bb-navbar-status">

      <span
        className="bb-navbar-status-item"
        title="Visits from this browser"
      >
        <strong className="bb-navbar-status-count">
          {visitorCount.toLocaleString()}
        </strong>{" "}
        visits
      </span>

      <span
        className="bb-navbar-status-divider"
        aria-hidden="true"
      />

      <span className="bb-navbar-status-item">
        {date} · {time}
      </span>

    </div>
  );
}


// Main Navbar
export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);


  return (
    <header className="bb-navbar">

      <div className="bb-navbar-inner">

        {/* Logo */}
        <a
          href="#home"
          className="bb-navbar-brand"
          onClick={(e) => {
            scrollToAnchor(e, "#home");
            setMobileOpen(false);
          }}
        >

          <img
            src={logo}
            alt="BudgetBasics logo"
            className="bb-navbar-logo"
          />

          <span className="bb-navbar-brand-name">
            BudgetBasics
          </span>

        </a>


        {/* Navigation */}
        <nav
          className={`bb-navbar-nav ${
            mobileOpen ? "is-mobile-open" : ""
          }`}
        >

          {NAV_ITEMS.map((item) => (

            <DropdownItem
              key={item.label}
              item={item}
              onNavigate={() => setMobileOpen(false)}
            />

          ))}

        </nav>


        {/* Status */}
        <NavbarStatus />


        {/* Mobile menu button */}
        <button
          type="button"
          className="bb-navbar-burger"
          onClick={() =>
            setMobileOpen((prev) => !prev)
          }
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >

          <span />
          <span />
          <span />

        </button>

      </div>

    </header>
  );
}