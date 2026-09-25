import React from "react";
import "./tokens.css";
import "./animations.css";
import "./Home.css";
import { IconBook, IconChart, IconImage, IconChat } from "./Icons.jsx";
import { useScrollReveal } from "./Usescrollreveal.js";
import heroIllustration from "../assets/bg.png";

const FEATURES = [
  { icon: IconBook, title: "Learn Budgeting Basics", description: "Get simple explanations and real-life examples." },
  { icon: IconChart, title: "Plan Your Finances", description: "Use our tools to set goals and track progress." },
  { icon: IconImage, title: "Explore Visual Resources", description: "Infographics, tips and more." },
  { icon: IconChat, title: "Get Help & AI Assistant", description: "Ask questions and get instant guidance." },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [quoteRef, quoteVisible] = useScrollReveal();

  return (
    <section id="home" className="home">
      <div className="home-hero">
        <div className="home-hero-text">
          <p className="home-eyebrow">Build better habits. A brighter future.</p>
          <h1 className="home-title">
            Small Steps Today,
            <br />
            <span className="home-title-accent">Big Dreams Tomorrow.</span>
          </h1>
          <p className="home-subtitle">
            Learn the basics of money management, plan your goals, make
            smarter choices and build the financial future you want.
          </p>
          <div className="home-cta-group">
            {/* Start Learning -> Learn Budgeting section */}
            <button type="button" className="btn btn-primary" onClick={() => scrollTo("#budgeting-basics")}>
              Start Learning →
            </button>
            {/* Explore Resources -> Resources section */}
            <button type="button" className="btn btn-secondary" onClick={() => scrollTo("#gallery")}>
              Explore Resources
            </button>
          </div>
        </div>

        <div className="home-hero-art">
          <img src={heroIllustration} alt="Person budgeting at a laptop" />
        </div>
      </div>

      <div
        ref={featuresRef}
        className={`home-features bb-reveal ${featuresVisible ? "is-visible" : ""}`}
      >
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`home-feature-card bb-reveal-item ${featuresVisible ? "is-visible" : ""}`}
              style={{ "--bb-delay": index }}
            >
              <span className="home-feature-icon">
                <Icon />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          );
        })}
      </div>

      <blockquote
        ref={quoteRef}
        className={`home-quote bb-reveal ${quoteVisible ? "is-visible" : ""}`}
      >
        <span className="home-quote-mark" aria-hidden="true">“</span>
        A budget is telling your money where to go instead of wondering where it went.
        <cite>— Dave Ramsey</cite>
      </blockquote>
    </section>
  );
}